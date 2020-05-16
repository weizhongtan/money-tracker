const boost = require('apollo-boost');
const fetch = require('node-fetch');

const { default: ApolloClient, gql } = boost;

const client = new ApolloClient({
  uri: 'http://localhost:3000/v1/graphql',
  fetch,
});

exports.createTransaction = async ({
  accountId,
  amount,
  date,
  description,
}) => {
  const query = gql`
    query MyQuery(
      $accountId: uuid
      $amount: numeric
      $date: timestamptz
      $description: String
    ) {
      transactions(
        where: {
          account_id: { _eq: $accountId }
          amount: { _eq: $amount }
          date: { _eq: $date }
          description: { _eq: $description }
        }
      ) {
        id
      }
    }
  `;
  const res = await client.query({
    query,
    variables: {
      accountId,
      amount,
      date,
      description,
    },
  });

  if (res.data.transactions.length) {
    console.error(`Transaction already exists: ${res.data.transactions[0].id}`);
    return false;
  }

  const MUTATION = gql`
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
    mutation: MUTATION,
    variables: {
      accountId,
      amount,
      date,
      description,
    },
  });
  return true;
};
