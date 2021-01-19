import {
  GetBreakdownQuery,
  useGetBreakdownQuery,
} from '../../generated/graphql';
import { GetElementType, TimePeriod } from '../../types';

export const useCategories = ({
  startDate,
  endDate,
  groupCategories,
  accountId,
}: TimePeriod & {
  groupCategories: boolean;
  accountId?: string;
}) => {
  const { loading, error, data } = useGetBreakdownQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      groupCategories,
    },
    fetchPolicy: 'no-cache',
  });

  const mapToDatum = (
    category: GetElementType<GetBreakdownQuery['expenseCategories']>
  ) => ({
    // _id will be used for transaction view
    _id: category.id,
    // id is used by pie chart for labels, so must be readable name
    id: category.name,
    name: category.name,
    label: category.name,
    value: Math.abs(category.sum),
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
