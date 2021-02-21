import { v4 as uuid } from 'uuid';

import {
  useDeleteTransactionsMutation,
  useGetTransactionsQuery,
  usePairTransactionsMutation,
  useUnpairTransactionsMutation,
  useUpdateTransactionsCategoryMutation,
} from '../../../../common/generated/graphql-react-apollo';
import { reversible, useBaseData } from '../../lib';
import { Account, Nullable, TimePeriod } from '../../types';

export const useTransactions = ({
  startDate,
  endDate,
  categoryId,
  accountId,
  searchText,
}: TimePeriod & {
  categoryId?: string;
  accountId?: string;
  searchText: string;
}) => {
  const searchAmount = Number(searchText) || 0;
  const searchAmountComplement = -searchAmount;

  const variables = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    categoryIds: categoryId ? [categoryId] : undefined,
    accountId,
    searchText: `%${searchText}%`,
    searchAmount,
    searchAmountComplement,
  };
  const { loading, error, data } = useGetTransactionsQuery({
    variables,
  });

  return {
    loading,
    error,
    transactions: data?.transactions.nodes,
    count: data?.transactions?.aggregate?.count ?? 0,
  };
};

export const useUpdateTransactions = () => {
  const [updateTransactions] = useUpdateTransactionsCategoryMutation({
    update(cache, { data }) {
      const updatedTransactions = data?.update_transaction?.returning;

      if (updatedTransactions) {
        updatedTransactions.forEach((transaction) => {
          const transactionId = cache.identify(transaction);
          const categoryId = cache.identify(transaction.category);
          cache.modify({
            id: transactionId,
            fields: {
              category() {
                return { __ref: categoryId };
              },
            },
            optimistic: true,
          });
        });
      }
    },
  });
  const [_deleteTransactions] = useDeleteTransactionsMutation();
  const [_pairTransactions] = usePairTransactionsMutation({
    update(cache, { data }) {
      const updatedTransactions = data?.update_transaction?.returning;

      if (updatedTransactions) {
        updatedTransactions.forEach((transaction) => {
          const transactionId = cache.identify(transaction);
          let linkedAccountId = cache.identify(
            transaction.linkedAccount as Account
          );
          cache.modify({
            id: transactionId,
            fields: {
              linkedAccount() {
                return { __ref: linkedAccountId };
              },
              pair_id() {
                return transaction.pair_id;
              },
            },
            optimistic: true,
          });
        });
      }
    },
  });
  const [_unpairTransactions] = useUnpairTransactionsMutation({
    update(cache, { data }) {
      const updatedTransactions = data?.update_transaction?.returning;

      if (updatedTransactions) {
        updatedTransactions.forEach((transaction) => {
          const transactionId = cache.identify(transaction);
          cache.modify({
            id: transactionId,
            fields: {
              linkedAccount() {
                return null;
              },
              pair_id() {
                return null;
              },
            },
            optimistic: true,
          });
        });
      }
    },
  });
  const { references } = useBaseData();

  const updateTransactionsCategory = reversible<{
    transactionIds: string[];
    newCategoryId: string;
    currentCategoryIds: string[];
  }>({
    async action({ transactionIds, newCategoryId }) {
      const { data } = await updateTransactions({
        variables: {
          transactionIds,
          categoryId: newCategoryId,
        },
      });
      const categoryName = data?.update_transaction?.returning[0].category.name;
      const affectedRows = data?.update_transaction?.affected_rows;
      return {
        message: `Updated: ${categoryName} (${affectedRows} records)`,
      };
    },
    async undo(_, { transactionIds, currentCategoryIds }) {
      const results = await Promise.all(
        currentCategoryIds.map(async (categoryId, index) => {
          const { data } = await updateTransactions({
            variables: {
              transactionIds: [transactionIds[index]],
              categoryId,
            },
          });
          return data?.update_transaction?.affected_rows ?? 0;
        })
      );
      const recordsUpdated = results.reduce((acc, val) => acc + val, 0);
      return `Undid: ${recordsUpdated} records`;
    },
  });

  const deleteTransactions = reversible<{
    transactionIds: string[];
  }>({
    async action({ transactionIds }) {
      const { data } = await _deleteTransactions({
        variables: {
          transactionIds,
        },
        refetchQueries: ['GetTransactions'],
      });
      return {
        message: `Deleted ${data?.delete_transaction?.affected_rows} rows`,
      };
    },
    undo() {},
  });

  const pairTransactions = reversible<
    {
      transactionIds: string[];
      accountIds: string[];
      amounts: number[];
      pairIds: Nullable<string>[];
    },
    {
      setPairId?: string;
    }
  >({
    async action({ transactionIds, accountIds, amounts, pairIds }) {
      if (accountIds[0] === accountIds[1]) {
        return {
          message: 'Transactions go to the same account',
          type: 'error',
        };
      }

      // transactions must mirror each other, i.e. first amount must complement second amount
      if (amounts[0] !== -amounts[1]) {
        return {
          message: 'Transactions do not match',
          type: 'error',
        };
      }

      if (pairIds.some((x) => x)) {
        return {
          message: 'Transactions are already paired',
          type: 'error',
        };
      }

      const setPairId = uuid();
      await _pairTransactions({
        variables: {
          transactionIds: [transactionIds[0]],
          setLinkedAccountId: accountIds[1],
          setPairId,
        },
      });
      await _pairTransactions({
        variables: {
          transactionIds: [transactionIds[1]],
          setLinkedAccountId: accountIds[0],
          setPairId,
        },
      });
      await updateTransactions({
        variables: {
          transactionIds: transactionIds,
          categoryId: references.internalTransferCategory.id,
        },
      });
      return {
        message: 'Paired transactions',
        setPairId,
      };
    },
    async undo({ setPairId }) {
      if (!setPairId) {
        return 'Didnt get pair ID';
      }
      await _unpairTransactions({
        variables: {
          pairIds: [setPairId],
        },
      });
      return 'Undid: pair';
    },
  });

  const unpairTransactions = reversible<{ pairIds: string[] }>({
    async action({ pairIds }) {
      await _unpairTransactions({
        variables: {
          pairIds,
        },
      });
      return {
        message: 'Unpaired transactions',
      };
    },
    async undo() {
      return 'Undo not implemented 🤷🏻‍♂️';
    },
  });

  return [
    updateTransactionsCategory,
    deleteTransactions,
    pairTransactions,
    unpairTransactions,
  ] as const;
};
