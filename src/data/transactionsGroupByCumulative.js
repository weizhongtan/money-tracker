import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS_GROUP_BY = gql`
  query MyQuery(
    $startDate: timestamptz
    $endDate: timestamptz
    $accountId: uuid
    $groupBy: String
  ) {
    accounts {
      id
      name
    }
    cumulative_transactions: func_transactions_by_account_grouped_cumulative(
      args: { v_account_id: $accountId, v_group_by: $groupBy }
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: asc }
    ) {
      date
      sum
    }
  }
`;
