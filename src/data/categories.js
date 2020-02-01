import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  query MyQuery(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryType: String
  ) {
    categories: func_category_by_date_type(
      args: {
        v_category_type: $categoryType
        v_end_date: $endDate
        v_start_date: $startDate
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
