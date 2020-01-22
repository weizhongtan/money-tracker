import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS = gql`
  query MyQuery(
    $searchText: String
    $orderBy: order_by
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    transactions(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        _and: { description: { _ilike: $searchText } }
      }
      order_by: { date: $orderBy }
    ) {
      date
      amount
      description
      id
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
    }
    transactions_aggregate(
      where: { description: { _ilike: $searchText } }
      order_by: { date: $orderBy }
    ) {
      aggregate {
        count
      }
    }
  }
`;
