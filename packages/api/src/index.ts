// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { AuthAPIClient, DataAPIClient } from 'truelayer-client';
import express, { Request, Response } from 'express';

import { AccountData } from './generated/graphql';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

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

  if (!tokens) {
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

  if (cardId) {
    const data = await DataAPIClient.getCardTransactions(
      tokens.access_token,
      cardId
    );

    console.log(data);

    res.json({
      transactionsJSON: JSON.stringify(data.results),
    });

    return;
  }

  res.json({
    data: 'Error: could not get any card or account data',
  });
});

app.listen(9999, () => {
  console.log('listening');
});