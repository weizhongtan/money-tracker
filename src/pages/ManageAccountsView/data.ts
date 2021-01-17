import { useApolloClient } from '@apollo/client';

import {
  CheckTransactionDocument,
  CheckTransactionQuery,
  CheckTransactionQueryVariables,
  InsertTransactionDocument,
  InsertTransactionMutation,
  InsertTransactionMutationVariables,
} from '../../generated/graphql';
import { time } from '../../lib';

interface Transaction {
  accountId: string;
  amount: number;
  date: string;
  description: string;
}

export const useCreateTransaction = () => {
  const client = useApolloClient();

  const createTransaction = async ({
    accountId,
    amount,
    date,
    description,
  }: Transaction) => {
    // do not add transactions that exist already
    // match any existing transaction to the same account, for the same amount, with the same description
    const startDate = new Date(date);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    const endDate = time(startDate).add(1, 'day').toDate();
    const res = await client.query<
      CheckTransactionQuery,
      CheckTransactionQueryVariables
    >({
      query: CheckTransactionDocument,
      variables: {
        accountId,
        amount,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        description,
      },
      fetchPolicy: 'no-cache',
    });

    if (res?.data?.transaction.length) {
      console.log(res.data.transaction.length);
      console.error(`Transaction already exists`, res.data.transaction[0]);
      return false;
    }
    await client.mutate<
      InsertTransactionMutation,
      InsertTransactionMutationVariables
    >({
      mutation: InsertTransactionDocument,
      variables: {
        accountId,
        amount,
        date,
        description,
      },
    });
    return true;
  };

  return [createTransaction];
};
