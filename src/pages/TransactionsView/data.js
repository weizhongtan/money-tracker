import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useContext } from 'react';

import { BaseDataContext, CategoriesList, reversible } from '../../lib';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $searchText: String!
    $searchAmount: numeric!
    $searchAmountComplement: numeric!
  ) {
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
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

export const useTransactions = ({ startDate, endDate, searchText }) => {
  const baseData = useContext(BaseDataContext);

  const searchAmount = Number(searchText) || 0;
  const searchAmountComplement = -searchAmount;
  const variables = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    searchText: `%${searchText}%`,
    searchAmount,
    searchAmountComplement,
  };
  console.log(variables);
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
              fullName: categories.getName(category?.id),
            },
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

const UPDATE_TRANSACTION_FROM_ACCOUNT = gql`
  mutation UpdateTransactions2($transactionId: uuid!, $fromAccountId: uuid) {
    update_transactions(
      where: { id: { _eq: $transactionId } }
      _set: { from_account_id: $fromAccountId, updated_at: "now" }
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
      return `Updated: ${categories.getName(newCategoryId)} (${
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
    async action({ transactionIds, toAccountIds, amounts }) {
      console.log({ transactionIds, toAccountIds, amounts });
      if (toAccountIds[0] === toAccountIds[1]) {
        return {
          message: 'Transactions go to the same account',
          type: 'error',
        };
      }

      if (amounts[0] !== amounts[1]) {
        return {
          message: 'Transactions do not match',
          type: 'error',
        };
      }
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[0],
          fromAccountId: toAccountIds[1],
        },
      });
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[1],
          fromAccountId: toAccountIds[0],
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
        },
      });
      await updateTransactionFromAccount({
        variables: {
          transactionId: transactionIds[1],
          fromAccountId: null,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Undid: link';
    },
  });

  return [updateTransactionsCategory, pairTransactions];
};
