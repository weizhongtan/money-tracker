import {
  GetCategoryBreakdownQuery,
  useGetCategoryBreakdownQuery,
} from '../../../../common/generated/graphql-react-apollo';
import { GetElementType, TimePeriod } from '../../types';

export const useCategories = ({
  startDate,
  endDate,
  groupCategories,
  accountId,
  fractionOfIncome,
}: TimePeriod & {
  groupCategories: boolean;
  accountId?: string;
  fractionOfIncome: boolean;
}) => {
  const { loading, error, data } = useGetCategoryBreakdownQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      groupCategories,
      accountId,
    },
    fetchPolicy: 'no-cache',
  });

  const mapToDatum = (
    category: GetElementType<GetCategoryBreakdownQuery['expenseCategories']>
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

  if (fractionOfIncome) {
    // add "Unspent/Uncategorised pseudo category"
    expense.categories?.unshift({
      _id: 'none',
      id: 'Unspent/Uncategorised',
      name: 'Unspent/Uncategorised',
      label: 'Unspent/Uncategorised',
      value: Math.abs(income.total ?? 0) - Math.abs(expense.total ?? 0),
    });
  }

  return {
    loading,
    error,
    expense,
    income,
  };
};
