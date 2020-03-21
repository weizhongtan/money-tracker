import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import uuid from 'uuid/v4';

import { CategoriesList, reversible, useBaseData } from '../../lib';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryIds: [uuid!]
    $searchText: String!
    $searchAmount: numeric!
    $searchAmountComplement: numeric!
  ) {
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        category_id: { _in: $categoryIds }
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
        accountByToAccountId {
          id
          name
        }
        accountByFromAccountId {
          id
          name
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
}) => {
  const baseData = useBaseData();

  const searchAmount = Number(searchText) || 0;
  const searchAmountComplement = -searchAmount;
  const categoryIds = baseData.categories
    .filter(cat => {
      const parentId = cat.parent?.id || cat.id;
      if (!categoryId || parentId === categoryId || cat.id === categoryId) {
        return true;
      }
      return false;
    })
    .map(x => x.id);
  const variables = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    categoryIds,
    searchText: `%${searchText}%`,
    searchAmount,
    searchAmountComplement,
  };
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, { variables });

  const categories = new CategoriesList(baseData.categories);

  return {
    loading,
    error,
    transactions: data?.transactions_aggregate.nodes
      .map(
        ({
          id,
          date,
          amount,
          accountByToAccountId,
          accountByFromAccountId,
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
            account: {
              to: {
                id: accountByToAccountId?.id,
                name: accountByToAccountId?.name,
              },
              from: {
                id: accountByFromAccountId?.id,
                name: accountByFromAccountId?.name,
              },
            },
            description: description,
            category: {
              id: category?.id,
              fullName: categories.getFullName(category?.id),
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
  mutation UpdateTransactions1(
    $transactionIds: [String!]!
    $categoryId: String
  ) {
    update_transactions(
      where: { id: { _in: $transactionIds } }
      _set: { category_id: $categoryId, updated_at: "now" }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_TRANSACTION_FROM_ACCOUNT = gql`
  mutation UpdateTransactions2(
    $transactionId: String!
    $fromAccountId: String
    $pairId: String
  ) {
    update_transactions(
      where: { id: { _eq: $transactionId } }
      _set: {
        from_account_id: $fromAccountId
        updated_at: "now"
        pair_id: $pairId
      }
    ) {
      affected_rows
    }
  }
`;

export const useUpdateTransactionsCategory = categories => {
  const [updateTransaction] = useMutation(UPDATE_TRANSACTIONS_CATEGORY);
  const [updateTransactionFromAccount] = useMutation(
    UPDATE_TRANSACTION_FROM_ACCOUNT
  );

  const updateTransactionsCategory = reversible({
    async action({
      transactionIds,
      newCategoryFullName,
      newCategoryId,
      currentCategoryIds,
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
    async undo({ transactionIds, currentCategoryIds }) {
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

  const pairTransactions = reversible({
    async action({ transactionIds, toAccountIds, amounts, pairIds }) {
      console.log({ transactionIds, toAccountIds, amounts });
      if (toAccountIds[0] === toAccountIds[1]) {
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

      if (pairIds.some(x => x)) {
        return {
          message: 'Transactions are already paired',
          type: 'error',
        };
      }

      const pairId = uuid();
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[0],
          fromAccountId: toAccountIds[1],
          pairId,
        },
      });
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[1],
          fromAccountId: toAccountIds[0],
          pairId,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Linked transactions';
    },
    async undo({ transactionIds }) {
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[0],
          fromAccountId: null,
          pairId: null,
        },
      });
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[1],
          fromAccountId: null,
          pairId: null,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Undid: link';
    },
  });

  return [updateTransactionsCategory, pairTransactions];
};
