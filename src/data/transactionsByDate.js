import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS_BY_DAY = gql`
  query MyQuery(
    $startDate: timestamptz
    $endDate: timestamptz
    $accountId: uuid
    $orderBy: order_by
  ) {
    accounts {
      id
      name
    }
    cumulative_transactions: function_transactions_by_day_cumulative(
      args: { v_account_id: $accountId }
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: $orderBy }
    ) {
      date
      sum
    }
  }
`;
