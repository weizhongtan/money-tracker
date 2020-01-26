import { gql } from 'apollo-boost';

export const QUERY = gql`
  mutation MyMutation($transactionId: uuid, $categoryId: uuid) {
    __typename
    update_transactions(
      where: { id: { _eq: $transactionId } }
      _set: { category_id: $categoryId }
    ) {
      affected_rows
    }
  }
`;
