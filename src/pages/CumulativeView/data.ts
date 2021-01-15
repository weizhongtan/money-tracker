import { useGetBalanceQuery } from '../../generated/graphql';
import { useBaseData } from '../../lib';
import { TimePeriod } from '../../types';

export const useData = ({
  startDate,
  endDate,
  accountId,
  precision,
}: TimePeriod & {
  accountId: string;
  precision: string;
}) => {
  const { accounts } = useBaseData();
  const { loading, error, data } = useGetBalanceQuery({
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      accountId: accountId === 'all' ? null : accountId,
      groupBy: precision,
    },
  });

  return {
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
};
