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
      accounts: data.accounts,
      categories: data.categories,
      references: {
        internalTransferCategory: data.categories.find(
          (x) => x.name === 'Internal Transfer'
        ),
      },
    },
  };

  return baseData;
};
