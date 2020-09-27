import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { useBaseData } from '../../lib';
import { TimePeriod } from '../../types';

const GET_CATEGORIES = gql`
  query GetCategories(
    $startDate: timestamptz
    $endDate: timestamptz
    $accountId: uuid
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
      id
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

interface TData {
  categories: {
    id: string;
    name: string;
    sum: number;
  }[];
  amount: {
    aggregate: {
      sum: {
        sum: number;
      };
    };
  };
}

export const useCategories = ({
  startDate,
  endDate,
  accountId,
  grouping,
}: TimePeriod & {
  accountId: string;
  grouping: string;
}) => {
  const { accounts } = useBaseData();
  const { loading, error, data } = useQuery<TData>(GET_CATEGORIES, {
    variables: {
      startDate,
      endDate,
      accountId: accountId === 'all' ? null : accountId,
      categoryType: 'expense',
      groupByParent: grouping === 'category',
    },
    fetchPolicy: 'no-cache',
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
      .map((category) => ({
        // _id will be used for transaction view
        _id: category.id,
        // id is used by pie chart for labels, so must be readable name
        id: category.name,
        name: category.name,
        label: category.name,
        value: Math.abs(category.sum),
      }))
      .sort((a, b) => b.value - a.value),
    total: data?.amount.aggregate.sum.sum,
  };
};