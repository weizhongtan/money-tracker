import { gql } from 'apollo-boost';

export const QUERY = gql`
  query MyQuery(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryId: uuid
    $groupBy: String
  ) {
    categories: view_categories_with_parents(order_by: { full_name: asc }) {
      id
      name: full_name
    }
    groups: func_transactions_by_category_grouped(
      args: { v_category_id: $categoryId, v_group_by: $groupBy }
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: asc }
    ) {
      date
      sum
    }
  }
`;
