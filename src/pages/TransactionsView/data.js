import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useContext } from 'react';

import { BaseDataContext, CategoriesList, reversible } from '../../lib';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $searchText: String
    $searchAmount: numeric
    $searchAmountComplement: numeric
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
        accountByFromAccountId {
          name
        }
        accountByToAccountId {
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

  const searchAmount = Number(searchText) || null;
  const searchAmountComplement = searchAmount ? -searchAmount : null;
  console.log(searchAmount);
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      searchText: `%${searchText}%`,
      searchAmount,
      searchAmountComplement,
    },
  });

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
          description,
          category,
          accountByFromAccountId,
        }) => {
          return {
            key: id,
            date: new Date(date),
            amount: {
              value: Number(amount),
              isOut: Number(amount) < 0,
            },
            account: {
              to: accountByToAccountId?.name,
              from: accountByFromAccountId?.name,
            },
            description: description,
            category: {
              fullName: categories.getName(category?.id),
              id: category?.id,
            },
          };
        }
      )
      .flat(),
    count: data?.transactions_aggregate.aggregate.count,
  };
};

const UPDATE_TRANSACTIONS = gql`
  mutation UpdateTransactions($transactionIds: [uuid!]!, $categoryId: uuid) {
    update_transactions(
      where: { id: { _in: $transactionIds } }
      _set: { category_id: $categoryId, updated_at: "now" }
    ) {
      returning {
        category_id
      }
      affected_rows
    }
  }
`;

export const useUpdateTransactionsCategory = categories => {
  const [updateTransaction] = useMutation(UPDATE_TRANSACTIONS);

  const updateTransactionsCategory = reversible({
    action: async ({
      transactionIds,
      newCategoryFullName,
      newCategoryId,
      currentCategoryIds,
    }) => {
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
    undo: async ({ transactionIds, currentCategoryIds }) => {
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

  return [updateTransactionsCategory];
};
