import { GetBaseDataQuery, GetTransactionsQuery } from '../generated/graphql';
import { time } from '../lib';

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

export type Account = GetElementType<GetBaseDataQuery['accounts']>;

export type Category = GetElementType<GetBaseDataQuery['categories']>;

export type Transaction = GetElementType<
  GetTransactionsQuery['transactions_aggregate']['nodes']
>;

export interface TimePeriod {
  startDate: time.Dayjs;
  endDate: time.Dayjs;
}

export type BaseData = GetBaseDataQuery & {
  references: Record<string, any>;
};

export type Nullable<T> = T | null | undefined;
