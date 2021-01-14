import { gql, useQuery } from '@apollo/client';

import { Account, Category } from '../types';

export const GET_BASE_DATA = gql`
  query GetBaseData {
    accounts: view_accounts(order_by: { name: asc }) {
      id
      key: id
      name
      initialAmount: initial_amount
      sum
      minimum
      colour
      mostRecentTransactionDate: most_recent_transaction_date
      status
    }
    categories: view_categories_with_parents(order_by: { full_name: asc }) {
      id
      key: id
      name
      type
    }
  }
`;

export interface GetBaseData {
  accounts: Account[];
  categories: Category[];
}

export const useBaseData = () => {
  const { loading, error, data } = useQuery<GetBaseData>(GET_BASE_DATA);
  if (loading || error || data === undefined) {
    return {
      loading,
      error,
      data: {
        accounts: [],
        categories: [],
      },
    };
  }

  return {
    data: {
      accounts: data.accounts,
      categories: data.categories,
    },
  };
};
