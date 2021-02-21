import { useGetBalancesQuery } from '../../../../common/generated/graphql-react-apollo';
import { TimePeriod } from '../../types';

export const useData = ({
  startDate,
  endDate,
  accountId,
  precision,
}: TimePeriod & {
  accountId?: string;
  precision: string;
}) => {
  const { loading, error, data } = useGetBalancesQuery({
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      accountId,
      groupBy: precision,
    },
  });

  return {
    loading,
    error,
    balances: data?.balances ?? [],
  };
};
