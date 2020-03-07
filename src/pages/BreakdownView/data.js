import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useBaseData } from '../../lib';

const GET_CATEGORIES = gql`
  query GetCategories(
    $startDate: timestamp
    $endDate: timestamp
    $accountId: String
    $categoryType: String
    $groupByParent: Boolean
  ) {
    categories: func_category_by_date_type(
      args: {
        v_account_id: $accountId
        v_category_type: $categoryType
        v_end_date: $endDate
        v_start_date: $startDate
        v_parent: $groupByParent
      }
    ) {
      name
      sum
    }
    amount: func_category_by_date_type_aggregate(
      args: {
        v_account_id: $accountId
        v_category_type: $categoryType
        v_end_date: $endDate
        v_start_date: $startDate
        v_parent: $groupByParent
      }
    ) {
      aggregate {
        sum {
          sum
        }
      }
    }
  }
`;

export const useCategories = ({ startDate, endDate, accountId, grouping }) => {
  const { accounts } = useBaseData();
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: {
      startDate,
      endDate,
      accountId: accountId === 'all' ? null : accountId,
      categoryType: 'expense',
      groupByParent: grouping === 'category',
    },
  });

  return {
    loading,
    error,
    accounts: [
      {
        id: 'all',
        name: 'All accounts',
      },
      ...accounts,
    ],
    categories: data?.categories
      .map(category => ({
        id: category.name,
        name: category.name,
        label: category.name,
        value: Math.abs(category.sum),
      }))
      .sort((a, b) => b.value - a.value),
    total: data?.amount.aggregate.sum.sum,
  };
};
