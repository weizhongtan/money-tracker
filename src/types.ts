export interface Account {
  id: string;
  name: string;
  colour: string;
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

export interface Category {
  id: string;
  parent: {
    id: string;
    name: string;
  };
  fullName: string;
}
