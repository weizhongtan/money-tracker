import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS = gql`
  query Transactions($accountName: String) {
    allTransactions(
      filter: {
        accountByToAccountId: { name: { includesInsensitive: $accountName } }
      }
    ) {
      nodes {
        date
        amount
        description
        accountByToAccountId {
          name
        }
        accountByFromAccountId {
          name
        }
        categoryByCategoryId {
          name
        }
        transactionByPairedWithId {
          id
        }
      }
    }
  }
`;
