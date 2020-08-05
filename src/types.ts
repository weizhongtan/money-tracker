export interface Account {
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
  parent: {
    name: string;
  };
  id: string;
  fullName: string;
}
