import { gql } from 'apollo-boost';

export const ALL_ACCOUNTS = gql`
  {
    allAccounts {
      nodes {
        rowId
      }
    }
  }
`;
