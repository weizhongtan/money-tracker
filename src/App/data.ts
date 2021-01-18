import { ApolloError } from '@apollo/client';

import { useGetBaseDataQuery } from '../generated/graphql';
import { BaseData } from '../types';

export const useBaseData = (): {
  loading: boolean;
  error?: ApolloError;
  data: BaseData;
} => {
  const { loading, error, data } = useGetBaseDataQuery();
  if (loading || error || data === undefined) {
    return {
      loading,
      error,
      data: {
        accounts: [],
        categories: [],
        references: {},
      },
    };
  }

  const baseData = {
    loading: false,
    data: {
      accounts: [
        {
          id: 'all',
          key: 'all',
          name: 'All accounts',
          initialAmount: 0,
          minimum: 0,
          mostRecentTransactionDate: null,
        },
        ...data.accounts,
      ],
      categories: [
        {
          id: 'all',
          key: 'all',
          name: 'All Categories',
        },
        ...data.categories,
      ],
      references: {
        internalTransferCategory: data.categories.find(
          (x) => x.name === 'Internal Transfer'
        ),
      },
    },
  };

  return baseData;
};
