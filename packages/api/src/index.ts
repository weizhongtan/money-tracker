import 'cross-fetch/polyfill';

import bodyParser from 'body-parser';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { GraphQLClient } from 'graphql-request';
import { AuthAPIClient, DataAPIClient } from 'truelayer-client';

import { getSdk } from '../../common/generated/graphql-request';

dotenv.config();

const redirectUri = 'http://localhost:3000/callback';

const authClient = new AuthAPIClient({
  client_id: process.env.CLIENT_ID ?? '',
  client_secret: process.env.CLIENT_SECRET ?? '',
});

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

const gqlClient = new GraphQLClient('http://localhost:3000/v1/graphql');
const sdk = getSdk(gqlClient);

app.post('/import-transactions', async (req, res) => {
  const { fromAccountId, fromCardId, toAccountId, startDate } = req.body.input;

  console.log({ fromAccountId, fromCardId, toAccountId, startDate });

  let api;
  let fromId;
  if (fromCardId) {
    fromId = fromCardId;
    api = DataAPIClient.getCardTransactions;
  } else if (fromAccountId) {
    fromId = fromAccountId;
    api = DataAPIClient.getTransactions;
  } else {
    return res.json({
      data: 'Error: could not get any card or account data',
    });
  }

  const data = await api(
    tokens.access_token,
    fromId,
    dayjs(startDate).format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
  );

  console.log(data);

  const proms = data.results.map(async (t) => {
    const startDate = new Date(t.timestamp);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    const endDate = dayjs(startDate).add(1, 'day').toDate();
    const res = await sdk.CheckTransaction({
      accountId: toAccountId,
      amount: t.amount,
      startDate: dayjs(startDate).toISOString(),
      endDate: endDate.toISOString(),
      description: t.description,
      originalId: t.transaction_id,
    });
    if (res.transaction.length) {
      console.error(`Transaction already exists`, res.transaction);
      return false;
    }

    await sdk.InsertTransaction({
      accountId: toAccountId,
      amount: -t.amount,
      date: t.timestamp,
      description: t.description,
      originalId: t.transaction_id,
    });

    return true;
  });
  const results = await Promise.all(proms);

  const created = results.filter((x) => x).length;
  const skipped = results.length - created;

  console.log(`Created ${created} records`);
  console.log(`Skipped ${skipped} records`);

  res.json({
    created,
    skipped,
  });
});

app.listen(9999, () => {
  console.log('listening');
});
