import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  query MyQuery(
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
