import { useGetCategoriesQuery } from '../../generated/graphql';
import { useBaseData } from '../../lib';
import { TimePeriod } from '../../types';

export const useCategories = ({
  startDate,
  endDate,
  accountId,
  grouping,
}: TimePeriod & {
  accountId: string;
  grouping: string;
}) => {
  const { accounts } = useBaseData();
  const { loading, error, data } = useGetCategoriesQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      accountId: accountId === 'all' ? null : accountId,
      categoryType: 'expense',
      groupByParent: grouping === 'category',
    },
    fetchPolicy: 'no-cache',
  });

  return {
    loading,
    error,
    accounts: [
      {
        id: 'all',
        name: 'All accounts',
      },
      ...accounts,
    ],
    categories: data?.categories
      .map((category) => ({
        // _id will be used for transaction view
        _id: category.id,
        // id is used by pie chart for labels, so must be readable name
        id: category.name,
        name: category.name,
        label: category.name,
        value: Math.abs(category.sum),
      }))
      .sort((a, b) => b.value - a.value),
    total: data?.amount?.aggregate?.sum?.sum,
  };
};
