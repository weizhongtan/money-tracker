import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { v4 as uuid } from 'uuid';

import { CategoriesList, reversible, useBaseData } from '../../lib';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryIds: [uuid!]
    $includeNullCategory: Boolean
    $searchText: String!
    $searchAmount: numeric!
    $searchAmountComplement: numeric!
  ) {
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        _and: {
          _or: [
            { category_id: { _in: $categoryIds } }
            { category_id: { _is_null: $includeNullCategory } }
          ]
        }
        _or: [
          { description: { _ilike: $searchText } }
          { amount: { _eq: $searchAmount } }
          { amount: { _eq: $searchAmountComplement } }
        ]
      }
      order_by: { date: desc }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        date
        amount
        description
        account {
          id
          name
          colour
        }
        linkedAccount {
          id
          name
          colour
        }
        category {
          id
          name
        }
        pair_id
      }
    }
  }
`;

export const useTransactions = ({
  startDate,
  endDate,
  categoryId,
  searchText,
}) => {
  const baseData = useBaseData();

  const searchAmount = Number(searchText) || 0;
  const searchAmountComplement = -searchAmount;
  const categoryIds = baseData.categories
    .filter(cat => {
      if (
        !categoryId ||
        cat.parent?.id === categoryId ||
        cat.id === categoryId
      ) {
        return true;
      }
      return false;
    })
    .map(x => x.id);
  const variables = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    categoryIds,
    includeNullCategory: !categoryId,
    searchText: `%${searchText}%`,
    searchAmount,
    searchAmountComplement,
  };
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, { variables });

  const categories = new CategoriesList(baseData.categories);

  return {
    loading,
    error,
    transactions: data?.transactions_aggregate.nodes
      .map(
        ({
          id,
          date,
          amount,
          account,
          linkedAccount,
          description,
          category,
          pair_id,
        }) => {
          return {
            key: id,
            date: new Date(date),
            amount: {
              value: Number(amount),
              isOut: Number(amount) < 0,
            },
            account: {
              to: {
                id: account?.id,
                name: account?.name,
                colour: account?.colour,
              },
              linked: {
                id: linkedAccount?.id,
                name: linkedAccount?.name,
                colour: linkedAccount?.colour,
              },
            },
            description: description,
            category: {
              id: category?.id,
              fullName: categories.getFullName(category?.id),
            },
            pairId: pair_id,
          };
        }
      )
      .flat(),
    count: data?.transactions_aggregate.aggregate.count,
  };
};

const UPDATE_TRANSACTIONS_CATEGORY = gql`
  mutation UpdateTransactions1($transactionIds: [uuid!]!, $categoryId: uuid) {
    update_transactions(
      where: { id: { _in: $transactionIds } }
      _set: { category_id: $categoryId, updated_at: "now" }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_TRANSACTION_LINKED_ACCOUNT = gql`
  mutation UpdateTransactions2(
    $transactionId: uuid!
    $linkedAccountId: uuid
    $pairId: uuid
  ) {
    update_transactions(
      where: { id: { _eq: $transactionId } }
      _set: {
        linked_account_id: $linkedAccountId
        updated_at: "now"
        pair_id: $pairId
      }
    ) {
      affected_rows
    }
  }
`;

export const useUpdateTransactionsCategory = categories => {
  const [updateTransaction] = useMutation(UPDATE_TRANSACTIONS_CATEGORY);
  const [updateTransactionLinkedAccount] = useMutation(
    UPDATE_TRANSACTION_LINKED_ACCOUNT
  );

  const updateTransactionsCategory = reversible({
    async action({
      transactionIds,
      newCategoryFullName,
      newCategoryId,
      currentCategoryIds,
    }) {
      const { data } = await updateTransaction({
        variables: {
          transactionIds,
          categoryId: newCategoryId,
        },
        refetchQueries: ['GetTransactions'],
      });
      return `Updated: ${categories.getFullName(newCategoryId)} (${
        data.update_transactions.affected_rows
      } records)`;
    },
    async undo({ transactionIds, currentCategoryIds }) {
      const results = await Promise.all(
        currentCategoryIds.map(async (categoryId, index) => {
          const { data } = await updateTransaction({
            variables: {
              transactionIds: [transactionIds[index]],
              categoryId,
            },
            refetchQueries: ['GetTransactions'],
          });
          return data.update_transactions.affected_rows;
        })
      );
      const recordsUpdated = results.reduce((acc, val) => acc + val, 0);
      return `Undid: ${recordsUpdated} records`;
    },
  });

  const pairTransactions = reversible({
    async action({ transactionIds, accountIds, amounts, pairIds }) {
      console.log({ transactionIds, accountIds, amounts });
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

      if (pairIds.some(x => x)) {
        return {
          message: 'Transactions are already paired',
          type: 'error',
        };
      }

      const pairId = uuid();
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[0],
          linkedAccountId: accountIds[1],
          pairId,
        },
      });
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[1],
          linkedAccountId: accountIds[0],
          pairId,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Paired transactions';
    },
    async undo({ transactionIds }) {
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[0],
          linkedAccountId: null,
          pairId: null,
        },
      });
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[1],
          linkedAccountId: null,
          pairId: null,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Undid: pair';
    },
  });

  const unPairTransactions = reversible({
    async action({ transactionIds }) {
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[0],
          linkedAccountId: null,
          pairId: null,
        },
      });
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[1],
          linkedAccountId: null,
          pairId: null,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Unpaired transactions';
    },
    async undo({ transactionIds, linkedAccountIds, pairId }) {
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[0],
          linkedAccountId: linkedAccountIds[0],
          pairId,
        },
      });
      await updateTransactionLinkedAccount({
        variables: {
          transactionId: transactionIds[1],
          linkedAccountId: linkedAccountIds[1],
          pairId,
        },
        refetchQueries: ['GetTransactions'],
      });
      return 'Undid: unpair';
    },
  });

  return [updateTransactionsCategory, pairTransactions, unPairTransactions];
};
