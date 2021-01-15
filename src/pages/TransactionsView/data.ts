import { v4 as uuid } from 'uuid';

import {
  useDeleteTransactionsMutation,
  useGetTransactionsQuery,
  usePairTransactionsMutation,
  useUnpairTransactionsMutation,
  useUpdateTransactionsCategoryMutation,
} from '../../generated/graphql';
import { reversible, useBaseData } from '../../lib';
import { Nullable, TimePeriod } from '../../types';

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
  const baseData = useBaseData();

  const searchAmount = Number(searchText) || 0;
  const searchAmountComplement = -searchAmount;
  let categoryIds;
  if (categoryId) {
    categoryIds = baseData.categories
      .filter((cat) => cat.id === categoryId)
      .map((x) => x.id);
  } else {
    categoryIds = baseData.categories.map((x) => x.id);
  }
  const variables = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    categoryIds,
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
    transactions: data?.transactions_aggregate.nodes,
    count: data?.transactions_aggregate?.aggregate?.count,
  };
};

export const useUpdateTransactions = () => {
  const [updateTransaction] = useUpdateTransactionsCategoryMutation();
  const [_deleteTransactions] = useDeleteTransactionsMutation();
  const [_pairTransactions] = usePairTransactionsMutation();
  const [_unpairTransactions] = useUnpairTransactionsMutation();
  const { references } = useBaseData();

  const updateTransactionsCategory = reversible<{
    transactionIds: string[];
    newCategoryId?: string;
    currentCategoryIds: (string | undefined)[];
  }>({
    async action({ transactionIds, newCategoryId }) {
      const { data } = await updateTransaction({
        variables: {
          transactionIds,
          categoryId: newCategoryId,
        },
        refetchQueries: ['GetTransactions'],
      });
      const categoryName =
        data?.update_transactions?.returning[0].category.name;
      const affectedRows = data?.update_transactions?.affected_rows;
      return {
        message: `Updated: ${categoryName} (${affectedRows} records)`,
      };
    },
    async undo(_, { transactionIds, currentCategoryIds }) {
      const results = await Promise.all(
        currentCategoryIds.map(async (categoryId, index) => {
          const { data } = await updateTransaction({
            variables: {
              transactionIds: [transactionIds[index]],
              categoryId,
            },
            refetchQueries: ['GetTransactions'],
          });
          return data?.update_transactions?.affected_rows as number;
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
        message: `Deleted ${data?.delete_transactions?.affected_rows} rows`,
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
      await updateTransaction({
        variables: {
          transactionIds: transactionIds,
          categoryId: references.internalTransferCategory.id,
        },
        refetchQueries: ['GetTransactions'],
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
        refetchQueries: ['GetTransactions'],
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
        refetchQueries: ['GetTransactions'],
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
