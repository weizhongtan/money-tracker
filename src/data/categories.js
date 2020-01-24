import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  query MyQuery($startDate: timestamptz, $endDate: timestamptz) {
    categories {
      name
      transactions_aggregate(
        where: {
          date: { _gte: $startDate, _lte: $endDate }
          _and: {
            amount: { _lt: "0" }
            _and: { amount: {}, from_account_id: { _is_null: true } }
          }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;
