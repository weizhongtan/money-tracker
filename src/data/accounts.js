import { gql } from 'apollo-boost';

export const GET_ACCOUNTS = gql`
  query MyQuery {
    accounts {
      id
      name
    }
  }
`;
