import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { AuthAPIClient, DataAPIClient } from 'truelayer-client';

import {
  AccountData,
  Mutation_RootGetAccountDataArgs,
} from './generated/graphql';

dotenv.config();

const redirectUri = 'http://localhost:3000/callback';

const client = new AuthAPIClient({
  client_id: process.env.CLIENT_ID ?? '',
  client_secret: process.env.CLIENT_SECRET ?? '',
});

const app = express();

app.use(bodyParser.json());

app.post('/get-auth-url', async (req, res) => {
  res.json({
    url: client.getAuthUrl({
      redirectURI: redirectUri,
      scope: ['info', 'accounts', 'balance', 'cards', 'transactions'],
      nonce: 'nonce',
    }),
  });
});

let tokens: { access_token: string };

app.post(
  '/get-account-data',
  async (
    req: Request<any, AccountData, { input: Mutation_RootGetAccountDataArgs }>,
    res: Response
  ) => {
    const { code } = req.body.input;

    if (!tokens) {
      tokens = await client.exchangeCodeForToken(redirectUri, code);
    }

    let accounts;
    try {
      accounts = await DataAPIClient.getAccounts(tokens.access_token);
    } catch (err) {
      console.log('accounts not supported, trying cards...');
    }

    let cards;
    try {
      cards = await DataAPIClient.getCards(tokens.access_token);

      const accountId = cards?.results[0].account_id;

      if (accountId) {
        const data = await DataAPIClient.getCardTransactions(
          tokens.access_token,
          accountId
        );

        return res.json({
          data: JSON.stringify(data),
        });
      }
    } catch (err) {
      console.log('cards not supported, giving up...');
    }

    res.json({
      data: 'Error: could not get any card or account data',
    });
  }
);

app.listen(9999, () => {
  console.log('listening');
});
