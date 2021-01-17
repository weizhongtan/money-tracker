import {
  GetCategoriesAggregateQuery,
  useGetCategoriesAggregateQuery,
} from '../../generated/graphql';
import { GetElementType, TimePeriod } from '../../types';

export const useCategories = ({
  startDate,
  endDate,
  accountId,
  grouping,
}: TimePeriod & {
  accountId?: string;
  grouping: string;
}) => {
  const { loading, error, data } = useGetCategoriesAggregateQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
    fetchPolicy: 'no-cache',
  });

  const mapToDatum = (
    category: GetElementType<GetCategoriesAggregateQuery['expenseCategories']>
  ) => ({
    // _id will be used for transaction view
    _id: category.id,
    // id is used by pie chart for labels, so must be readable name
    id: category.name,
    name: category.name,
    label: category.name,
    value: Math.abs(
      category.transactions_aggregate?.aggregate?.sum?.amount as number
    ),
  });

  const expense = {
    categories: data?.expenseCategories.map(mapToDatum),
    total: data?.expenseSum.aggregate?.sum?.amount,
  };
  const income = {
    categories: data?.incomeCategories.map(mapToDatum),
    total: data?.incomeSum.aggregate?.sum?.amount,
  };

  // add "Unspent/Uncategorised pseudo category"
  expense.categories?.push({
    _id: 'none',
    id: 'Unspent/Uncategorised',
    name: 'Unspent/Uncategorised',
    label: 'Unspent/Uncategorised',
    value: Math.abs(income.total ?? 0) - Math.abs(expense.total ?? 0),
  });
  expense.categories?.sort((a, b) => b.value - a.value);

  return {
    loading,
    error,
    expense,
    income,
  };
};
