import { useMutation, useQuery } from '@apollo/react-hooks';
import { ApolloError, gql } from 'apollo-boost';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { CategoriesList, reversible, useBaseData } from '../../../lib';
import { Account, Category, Transaction } from '../../../types';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryIds: [uuid!]
    $includeNullCategory: Boolean
    $searchText: String!
    $searchAmount: numeric!
    $searchAmountComplement: numeric!
  ) {
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        _and: {
          _or: [
            { category_id: { _in: $categoryIds } }
            { category_id: { _is_null: $includeNullCategory } }
          ]
        }
        _or: [
          { description: { _ilike: $searchText } }
          { amount: { _eq: $searchAmount } }
          { amount: { _eq: $searchAmountComplement } }
        ]
      }
      order_by: { date: desc }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        date
        amount
        description
        account {
          id
          name
          colour
        }
        linkedAccount {
          id
          name
          colour
        }
        category {
          id
          name
        }
        pair_id
      }
    }
  }
`;

export const useTransactions = ({
  startDate,
  endDate,
  categoryId,
  searchText,
}: {
  startDate: moment.Moment;
  endDate: moment.Moment;
  categoryId?: string;
  searchText: string;
}): {
  loading: boolean;
  error?: ApolloError;
  transactions?: Transaction[];
  count?: number;
} => {
  const baseData = useBaseData();

  const searchAmount = Number(searchText) || 0;
  const searchAmountComplement = -searchAmount;
  const categoryIds = baseData.categories
    .filter((cat) => {
      if (
        !categoryId ||
        cat.parent?.id === categoryId ||
        cat.id === categoryId
      ) {
        return true;
      }
      return false;
    })
    .map((x) => x.id);
  const variables = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    categoryIds,
    includeNullCategory: !categoryId,
    searchText: `%${searchText}%`,
    searchAmount,
    searchAmountComplement,
  };

  interface TData {
    transactions_aggregate: {
      aggregate: {
        count: number;
      };
      nodes: {
        id: string;
        date: string;
        amount: string;
        account: Account;
        linkedAccount?: Account;
        description: string;
        category?: Category;
        pair_id?: string;
      }[];
    };
  }
  const { loading, error, data } = useQuery<TData>(GET_TRANSACTIONS, {
    variables,
  });

  return {
    loading,
    error,
    transactions: data?.transactions_aggregate.nodes.map(
      ({
        id,
        date,
        amount,
        account,
        linkedAccount,
        description,
        category,
        pair_id,
      }) => {
        return {
          key: id,
          date: new Date(date),
          amount: {
            value: Number(amount),
            isOut: Number(amount) < 0,
          },
          account,
          linkedAccount,
          description,
          category,
          pairId: pair_id,
        };
      }
    ),
    count: data?.transactions_aggregate.aggregate.count,
  };
};

const UPDATE_TRANSACTIONS_CATEGORY = gql`
  mutation UpdateTransactions1($transactionIds: [uuid!]!, $categoryId: uuid) {
    update_transactions(
      where: { id: { _in: $transactionIds } }
      _set: { category_id: $categoryId, updated_at: "now" }
    ) {
      affected_rows
      returning {
        category {
          name
        }
      }
    }
  }
`;

const DELETE_TRANSACTIONS = gql`
  mutation DeleteTransactions($transactionIds: [uuid!]!) {
    delete_transactions(where: { id: { _in: $transactionIds } }) {
      affected_rows
    }
  }
`;

const UNPAIR_TRANSACTIONS = gql`
  mutation UnpairTransactions($pairIds: [uuid!]!) {
    update_transactions(
      where: { pair_id: { _in: $pairIds } }
      _set: { linked_account_id: null, updated_at: "now", pair_id: null }
    ) {
      affected_rows
    }
  }
`;

const PAIR_TRANSACTIONS = gql`
  mutation PairTransactions(
    $transactionIds: [uuid!]!
    $setLinkedAccountId: uuid
    $setPairId: uuid
  ) {
    update_transactions(
      where: { id: { _in: $transactionIds } }
      _set: {
        updated_at: "now"
        linked_account_id: $setLinkedAccountId
        pair_id: $setPairId
      }
    ) {
      affected_rows
    }
  }
`;

export const useUpdateTransactionsCategory = (categories: CategoriesList) => {
  const [updateTransaction] = useMutation(UPDATE_TRANSACTIONS_CATEGORY);
  const [_deleteTransactions] = useMutation(DELETE_TRANSACTIONS);
  const [_pairTransactions] = useMutation(PAIR_TRANSACTIONS);
  const [_unpairTransactions] = useMutation(UNPAIR_TRANSACTIONS);

  const updateTransactionsCategory = reversible<{
    transactionIds: string[];
    newCategoryId: string;
    currentCategoryIds: (string | undefined)[];
  }>({
    async action({ transactionIds, newCategoryId }) {
      const { data } = await updateTransaction({
        variables: {
          transactionIds,
          categoryId: newCategoryId,
        },
        refetchQueries: ['GetTransactions'],
      });
      const categoryName = data.update_transactions.returning.category.name;
      const { affected_rows } = data.update_transactions;
      return {
        message: `Updated: ${categoryName} (${affected_rows} records)`,
      };
    },
    async undo(_, { transactionIds, currentCategoryIds }) {
      const results = await Promise.all(
        currentCategoryIds.map(async (categoryId, index) => {
          const { data } = await updateTransaction({
            variables: {
              transactionIds: [transactionIds[index]],
              categoryId,
            },
            refetchQueries: ['GetTransactions'],
          });
          return data.update_transactions.affected_rows;
        })
      );
      const recordsUpdated = results.reduce((acc, val) => acc + val, 0);
      return `Undid: ${recordsUpdated} records`;
    },
  });

  const deleteTransactions = reversible<{
    transactionIds: string[];
  }>({
    async action({ transactionIds }) {
      const { data } = await _deleteTransactions({
        variables: {
          transactionIds,
        },
        refetchQueries: ['GetTransactions'],
      });
      return {
        message: `Deleted ${data.delete_transactions.affected_rows} rows`,
      };
    },
    undo() {},
  });

  const pairTransactions = reversible<
    {
      transactionIds: string[];
      accountIds: string[];
      amounts: number[];
      pairIds: (string | undefined)[];
    },
    {
      setPairId?: string;
    }
  >({
    async action({ transactionIds, accountIds, amounts, pairIds }) {
      if (accountIds[0] === accountIds[1]) {
        return {
          message: 'Transactions go to the same account',
          type: 'error',
        };
      }

      // transactions must mirror each other, i.e. first amount must complement second amount
      if (amounts[0] !== -amounts[1]) {
        return {
          message: 'Transactions do not match',
          type: 'error',
        };
      }

      if (pairIds.some((x) => x)) {
        return {
          message: 'Transactions are already paired',
          type: 'error',
        };
      }

      const setPairId = uuid();
      await _pairTransactions({
        variables: {
          transactionIds: [transactionIds[0]],
          setLinkedAccountId: accountIds[1],
          setPairId,
        },
      });
      await _pairTransactions({
        variables: {
          transactionIds: [transactionIds[1]],
          setLinkedAccountId: accountIds[0],
          setPairId,
        },
        refetchQueries: ['GetTransactions'],
      });
      return {
        message: 'Paired transactions',
        setPairId,
      };
    },
    async undo({ setPairId }) {
      if (!setPairId) {
        return 'Didnt get pair ID';
      }
      await _unpairTransactions({
        variables: {
          pairIds: [setPairId],
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Undid: pair';
    },
  });

  const unpairTransactions = reversible<{ pairIds: (string | undefined)[] }>({
    async action({ pairIds }) {
      await _unpairTransactions({
        variables: {
          pairIds,
        },
        refetchQueries: ['GetTransactions'],
      });
      return {
        message: 'Unpaired transactions',
      };
    },
    async undo() {
      return 'Undo not implemented 🤷🏻‍♂️';
    },
  });

  return [
    updateTransactionsCategory,
    deleteTransactions,
    pairTransactions,
    unpairTransactions,
  ] as const;
};
