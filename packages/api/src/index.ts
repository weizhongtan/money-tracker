import * as querystring from 'querystring';

import {
  AccountData,
  Mutation_RootGetAccountDataArgs,
} from './generated/graphql';
import { AuthAPIClient, DataAPIClient } from 'truelayer-client';
import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const redirect_uri = 'http://localhost:3000/callback';

const client = new AuthAPIClient({
  client_id: process.env.CLIENT_ID ?? '',
  client_secret: process.env.CLIENT_SECRET ?? '',
});

const app = express();

app.use(bodyParser.json());

let tokens: { access_token: string };

app.post(
  '/get-account-data',
  async (
    req: Request<any, AccountData, { input: Mutation_RootGetAccountDataArgs }>,
    res: Response
  ) => {
    const { code } = req.body.input;

    if (!tokens) {
      tokens = await client.exchangeCodeForToken(redirect_uri, code);
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
