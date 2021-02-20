import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { AuthAPIClient, DataAPIClient } from 'truelayer-client';

import { AccountData } from './generated/graphql';

dotenv.config();

const redirectUri = 'http://localhost:3000/callback';

const authClient = new AuthAPIClient({
  client_id: process.env.CLIENT_ID ?? '',
  client_secret: process.env.CLIENT_SECRET ?? '',
});

// const apolloClient = new ApolloClient({
//   uri: 'http://localhost:3000/v1/graphql',
//   cache: new InMemoryCache(),
// });

const app = express();

app.use(bodyParser.json());

app.post('/get-auth-url', async (req, res) => {
  res.json({
    url: authClient.getAuthUrl({
      redirectURI: redirectUri,
      scope: ['info', 'accounts', 'balance', 'cards', 'transactions'],
      nonce: 'nonce',
    }),
  });
});

let tokens: { access_token: string };

app.post('/exchange-code', async (req, res) => {
  const { code } = req.body.input;

  // get new access token if none exists, or if cached tokens have expired
  if (
    !tokens ||
    (tokens && !DataAPIClient.validateToken(tokens.access_token))
  ) {
    console.log('exchanging code for token');
    tokens = await authClient.exchangeCodeForToken(redirectUri, code);
  }

  console.log(tokens);

  let accounts;
  try {
    accounts = (await DataAPIClient.getAccounts(tokens.access_token)).results;
  } catch (err) {
    console.log('accounts not supported, trying cards...');
  }

  let cards;
  try {
    cards = (await DataAPIClient.getCards(tokens.access_token)).results;
  } catch (err) {
    console.log('cards not supported, giving up');
  }

  res.json({
    message: 'successfully exchanged tokens!',
    accountIds: accounts?.map((x) => x.account_id),
    cardIds: cards?.map((x) => x.account_id),
  });
});

app.post('/import-transactions', async (req, res) => {
  const { accountId, cardId } = req.body.input;

  let api;
  let id;
  if (cardId) {
    id = cardId;
    api = DataAPIClient.getCardTransactions;
  } else if (accountId) {
    id = accountId;
    api = DataAPIClient.getTransactions;
  } else {
    return res.json({
      data: 'Error: could not get any card or account data',
    });
  }

  const data = await api(tokens.access_token, id);

  console.log(data);

  res.json({
    transactionsJSON: JSON.stringify(data.results),
  });
});

app.listen(9999, () => {
  console.log('listening');
});
