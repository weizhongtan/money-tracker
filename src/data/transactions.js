import { gql } from 'apollo-boost';

export const QUERY = gql`
  query MyQuery(
    $startDate: timestamptz
    $endDate: timestamptz
    $searchText: String
    $orderBy: order_by = desc
  ) {
    categories(order_by: { name: asc }) {
      id
      name
    }
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        _and: { description: { _ilike: $searchText } }
      }
      order_by: { date: $orderBy }
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
          name
        }
        pair_id
        split_transactions {
          id
          amount
          description
          category {
            name
          }
        }
      }
    }
  }
`;
