import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { CategoriesList, reversible, useBaseData } from '../../../lib';
import { Account, Category } from '../../../types';

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
}) => {
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
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, { variables });

  return {
    loading,
    error,
    transactions: data?.transactions_aggregate.nodes
      .map(
        ({
          id,
          date,
          amount,
          account,
          linkedAccount,
          description,
          category,
          pair_id,
        }: {
          id: string;
          date: string;
          amount: string;
          account: Account;
          linkedAccount?: Account;
          description: string;
          category?: Category;
          pair_id?: string;
        }) => {
          return {
            key: id,
            date: new Date(date),
            amount: {
              value: Number(amount),
              isOut: Number(amount) < 0,
            },
            account: {
              to: {
                id: account?.id,
                name: account?.name,
                colour: account?.colour,
              },
              linked: {
                id: linkedAccount?.id,
                name: linkedAccount?.name,
                colour: linkedAccount?.colour,
              },
            },
            description: description,
            category: {
              id: category?.id,
              fullName: category?.name,
            },
            pairId: pair_id,
          };
        }
      )
      .flat(),
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

  const updateTransactionsCategory = reversible({
    async action({
      transactionIds,
      newCategoryId,
    }: {
      transactionIds: string[];
      newCategoryId: string;
    }) {
      const { data } = await updateTransaction({
        variables: {
          transactionIds,
          categoryId: newCategoryId,
        },
        refetchQueries: ['GetTransactions'],
      });
      return `Updated: ${categories.getFullName(newCategoryId)} (${
        data.update_transactions.affected_rows
      } records)`;
    },
    async undo(
      result,
      {
        transactionIds,
        currentCategoryIds,
      }: { transactionIds: string[]; currentCategoryIds: string[] }
    ) {
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

  const deleteTransactions = reversible({
    async action({ transactionIds }) {
      const { data } = await _deleteTransactions({
        variables: {
          transactionIds,
        },
        refetchQueries: ['GetTransactions'],
      });
      return `Deleted ${data.delete_transactions.affected_rows} rows`;
    },
    undo() {},
  });

  const pairTransactions = reversible({
    async action({
      transactionIds,
      accountIds,
      amounts,
      pairIds,
    }: {
      transactionIds: string[];
      accountIds: string[];
      amounts: number[];
      pairIds: string[];
    }) {
      console.log({ transactionIds, accountIds, amounts });
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
      return 'Paired transactions';
    },
    async undo(result, { setPairId }) {
      await _unpairTransactions({
        variables: {
          pairIds: [setPairId],
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Undid: pair';
    },
  });

  const unpairTransactions = reversible({
    async action({ pairIds }) {
      await _unpairTransactions({
        variables: {
          pairIds,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Unpaired transactions';
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
