import { gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import moment from 'moment';

export const useCreateTransaction = () => {
  const client = useApolloClient();

  const createTransaction = async ({
    accountId,
    amount,
    date,
    description,
  }) => {
    const query = gql`
      query MyQuery(
        $accountId: uuid!
        $amount: numeric!
        $startDate: timestamptz!
        $endDate: timestamptz!
        $description: String!
      ) {
        transactions(
          where: {
            _and: [
              { account_id: { _eq: $accountId } }
              { amount: { _eq: $amount } }
              { date: { _gte: $startDate, _lt: $endDate } }
              { description: { _eq: $description } }
            ]
          }
        ) {
          id
          account_id
          amount
          date
          description
        }
      }
    `;
    // do not add transactions that exist already
    // match any existing transaction to the same account, for the same amount, with the same description
    const startDate = new Date(date);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    const endDate = moment(startDate).add(1, 'day').toDate();
    const res = await client.query({
      query,
      variables: {
        accountId,
        amount,
        startDate,
        endDate,
        description,
      },
      fetchPolicy: 'no-cache',
    });

    if (res.data.transactions.length) {
      console.log(res.data.transactions.length);
      console.error(`Transaction already exists`, res.data.transactions[0]);
      return false;
    }

    const mutation = gql`
      mutation MyMutation(
        $accountId: uuid
        $amount: numeric
        $date: timestamptz
        $description: String
      ) {
        insert_transactions(
          objects: {
            account_id: $accountId
            amount: $amount
            date: $date
            description: $description
          }
        ) {
          affected_rows
        }
      }
    `;
    await client.mutate({
      mutation,
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
