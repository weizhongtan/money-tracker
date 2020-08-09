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
  parent?: {
    id: string;
    name: string;
  };
  fullName?: string;
}

export interface Transaction {
  account: {
    to: {
      id: string;
      name: string;
    };
  };
  amount: {
    value: number;
    isOut: boolean;
  };
  pairId: string;
  key: string;
  category?: {
    id: string;
    fullName: string;
  };
}

export interface TimePeriod {
  startDate: moment.Moment;
  endDate: moment.Moment;
}
