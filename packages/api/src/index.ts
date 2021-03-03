import path from 'path';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request as ExpressRequest, Response } from 'express';
import { GraphQLClient } from 'graphql-request';
import morgan from 'morgan';
import {
  AuthAPIClient,
  DataAPIClient,
  ICardTransaction,
  IResult,
  ITokenResponse,
  ITransaction,
} from 'truelayer-client';

import { time } from '../../client/src/lib';
import {
  AuthUrl,
  ExchangeCodeInput,
  ExchangeCodeOutput,
  ImportTransactionsInput,
  ImportTransactionsOutput,
  getSdk,
} from '../../common/generated/graphql-request';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

interface Request<Args>
  extends ExpressRequest<{}, {}, { input: { args: Args } }> {}

const redirectUri = 'http://localhost:3000/callback';

const authClient = new AuthAPIClient({
  client_id: process.env.CLIENT_ID ?? '',
  client_secret: process.env.CLIENT_SECRET ?? '',
});

const app = express();

app.use(bodyParser.json());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.post('/get-auth-url', async (req, res: Response<AuthUrl>) => {
  res.json({
    url: authClient.getAuthUrl({
      redirectURI: redirectUri,
      scope: ['info', 'accounts', 'balance', 'cards', 'transactions'],
      nonce: 'nonce',
    }),
  });
});

let tokens: ITokenResponse;

app.post(
  '/exchange-code',
  async (
    req: Request<ExchangeCodeInput>,
    res: Response<ExchangeCodeOutput>
  ) => {
    const { code } = req.body.input.args;

    console.log('exchanging code for token');
    tokens = await authClient.exchangeCodeForToken(redirectUri, code);

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
      accounts: accounts?.map((x) => JSON.stringify(x)),
      cards: cards?.map((x) => JSON.stringify(x)),
    });
  }
);

const gqlClient = new GraphQLClient('http://localhost:3000/v1/graphql');
const sdk = getSdk(gqlClient);

app.post(
  '/import-transactions',
  async (
    req: Request<ImportTransactionsInput>,
    res: Response<ImportTransactionsOutput>
  ) => {
    const {
      fromAccountId,
      fromCardId,
      toAccountId,
      startDate,
    } = req.body.input.args;

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
        message: 'Error: could not get any card or account data',
        created: 0,
        skipped: 0,
      });
    }

    console.log('################# getting data from API');
    const data: IResult<ICardTransaction | ITransaction> = await api(
      tokens.access_token,
      fromId,
      time(startDate).format('YYYY-MM-DD'),
      time().format('YYYY-MM-DD')
    );

    console.log(data);

    const proms = data.results.map(async (t) => {
      const startDate = new Date(t.timestamp);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      const endDate = time(startDate).add(1, 'day').toDate();

      if (!('transaction_type' in t)) {
        console.log('could not parse transaction_type');
        return false;
      }
      const amount =
        t.transaction_type === 'DEBIT'
          ? -Math.abs(t.amount)
          : Math.abs(t.amount);
      const res = await sdk.CheckTransaction({
        accountId: toAccountId,
        amount,
        startDate: time(startDate).toISOString(),
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
        amount,
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
      message: 'success',
      created,
      skipped,
    });
  }
);

app.listen(9999, () => {
  console.log('listening');
});
