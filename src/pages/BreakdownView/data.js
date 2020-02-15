import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_CATEGORIES = gql`
  query GetCategories(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryType: String
    $groupByParent: Boolean
  ) {
    categories: func_category_by_date_type(
      args: {
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

export const useCategories = ({ startDate, endDate, grouping }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: {
      startDate,
      endDate,
      categoryType: 'expense',
      groupByParent: grouping === 'category',
    },
  });

  return {
    loading,
    error,
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