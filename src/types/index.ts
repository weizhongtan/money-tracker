import moment from 'moment';

import { GetBaseDataQuery, GetTransactionsQuery } from '../generated/graphql';

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

export type Account = GetElementType<GetBaseDataQuery['accounts']>;

export type Category = GetElementType<GetBaseDataQuery['categories']>;

export type Transaction = GetElementType<
  GetTransactionsQuery['transactions_aggregate']['nodes']
>;

export interface TimePeriod {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export type BaseData = GetBaseDataQuery & {
  references: Record<string, any>;
};
