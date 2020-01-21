import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  query Stuff {
    allCategories {
      nodes {
        name
        transactionsByCategoryId(
          filter: {
            date: { greaterThan: "2018-12-21T00:11:46.639Z" }
            amount: { lessThan: "0" }
          }
        ) {
          nodes {
            amount
          }
        }
      }
    }
  }
`;
