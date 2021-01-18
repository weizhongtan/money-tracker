import { ApolloError } from '@apollo/client';

import { useGetBaseDataQuery } from '../generated/graphql';
import { Account, BaseData, Category } from '../types';

export function createCatchAllAccount(id = 'all'): Account {
  return {
    id,
    key: id,
    name: 'All accounts',
    initialAmount: 0,
    minimum: 0,
    mostRecentTransactionDate: null,
  };
}

export function createCatchAllCategory(id = 'all'): Category {
  return {
    id,
    key: id,
    name: 'All Categories',
  };
}

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
      accounts: [createCatchAllAccount(), ...data.accounts],
      categories: [createCatchAllCategory(), ...data.categories],
      references: {
        internalTransferCategory: data.categories.find(
          (x) => x.name === 'Internal Transfer'
        ),
      },
    },
  };

  return baseData;
};
