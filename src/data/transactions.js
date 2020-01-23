import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS = gql`
  query MyQuery(
    $startDate: timestamptz
    $endDate: timestamptz
    $searchText: String
    $orderBy: order_by = desc
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
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        _and: { description: { _ilike: $searchText } }
      }
      order_by: { date: $orderBy }
    ) {
      aggregate {
        count
      }
    }
  }
`;
