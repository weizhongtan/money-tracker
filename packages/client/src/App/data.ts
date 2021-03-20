import { ApolloError } from '@apollo/client';

import { useGetBaseDataQuery } from '../../../common/generated/graphql-react-apollo';
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
