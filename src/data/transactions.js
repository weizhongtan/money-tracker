import { gql } from 'apollo-boost';

export const GET_TRANSACTIONS = gql`
  query Transactions(
    $searchText: String
    $orderBy: [TransactionsOrderBy!] = DATE_DESC
  ) {
    allTransactions(
      filter: { description: { includesInsensitive: $searchText } }
      orderBy: $orderBy
    ) {
      totalCount
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
