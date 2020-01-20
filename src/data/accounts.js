import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const ALL_ACCOUNTS = gql`
  {
    allAccounts {
      nodes {
        rowId
      }
    }
  }
`;

export const useAccounts = () => {
  return useQuery(ALL_ACCOUNTS);

  // const getByKey = thing => key => {
  //   const s = data[thing].find(t => t.key === key);
  //   if (s) {
  //     return s.name;
  //   }
  //   return null;
  // };

  // const getAccountByKey = getByKey('account');
  // const getCategoryByKey = getByKey('cat');

  // const mappedData = data.ope.map((transaction, index) => ({
  //   ...transaction,
  //   no: index,
  //   date: new Date(Number(transaction.date)).toISOString(),
  //   amount: Number.parseFloat(transaction.amount).toFixed(2),
  //   account: getAccountByKey(transaction.account),
  //   category: getCategoryByKey(transaction.category),
  //   fromInternalAccount: getAccountByKey(transaction.dst_account),
  // }));
};
