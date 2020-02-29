import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useBaseData } from '../../lib';

const GET_BALANCE = gql`
  query GetBalance(
    $startDate: timestamptz
    $endDate: timestamptz
    $accountId: uuid
    $groupBy: String
  ) {
    balances: func_transactions_by_account_grouped_cumulative(
      args: {
        v_account_id: $accountId
        v_group_by: $groupBy
        v_start_date: $startDate
      }
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: asc }
    ) {
      date
      sum
    }
  }
`;

export const useData = ({ startDate, endDate, accountId, precision }) => {
  const { accounts } = useBaseData();
  const { loading, error, data } = useQuery(GET_BALANCE, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      accountId: accountId === 'all' ? null : accountId,
      groupBy: precision,
    },
  });

  const ret = {
    loading,
    error,
    balances: data?.balances,
    accounts: [
      {
        id: 'all',
        name: 'All accounts',
      },
      ...accounts,
    ],
  };
  console.log({ ret });
  return ret;
};
