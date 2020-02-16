import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useContext } from 'react';

import { BaseDataContext, CategoriesList } from '../../lib';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $searchText: String
  ) {
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        description: { _ilike: $searchText }
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

  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      searchText: `%${searchText}%`,
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
