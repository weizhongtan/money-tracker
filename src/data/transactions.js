import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS = gql`
  query Transactions($account: String) {
    allAccounts(filter: { name: { includesInsensitive: $account } }) {
      nodes {
        transactionsByToAccountId {
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
    }
  }
`;
