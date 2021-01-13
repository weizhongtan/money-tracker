import moment from 'moment';

export interface Account {
  id: string;
  key: string;
  name: string;
  initialAmount: number;
  sum: number;
  minimum: number;
  colour: string;
}

export interface Category {
  id: string;
  key: string;
  name: string;
  type?: string;
}

export interface Transaction {
  key: string;
  date: Date;
  amount: {
    value: number;
    isOut: boolean;
  };
  account: Account;
  linkedAccount?: Account;
  description: string;
  category: Category;
  pairId?: string;
}

export interface TimePeriod {
  startDate: moment.Moment;
  endDate: moment.Moment;
}
