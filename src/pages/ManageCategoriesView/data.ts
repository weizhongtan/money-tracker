import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { GET_BASE_DATA, GetBaseData } from '../../App';
import { Category } from '../../types';

const mutation = gql`
  mutation MyMutation($name: String!, $type: String) {
    insert_categories(objects: { name: $name, type: $type }) {
      affected_rows
      returning {
        id
        name
        type
      }
    }
  }
`;

interface NewCategoryDetails {
  insert_categories: {
    affected_rows: number;
    returning: Category[];
  };
}

export const useCreateCategory = () => {
  const [_createCategory] = useMutation<NewCategoryDetails>(mutation, {
    update(cache, { data }) {
      const newCategory = data?.insert_categories.returning[0];
      const existingData = cache.readQuery<GetBaseData>({
        query: GET_BASE_DATA,
      });

      if (existingData && newCategory) {
        cache.writeQuery({
          query: GET_BASE_DATA,
          data: {
            ...existingData,
            categories: [newCategory, ...existingData.categories],
          },
        });
      }
    },
  });

  const createCategory = async (name: string, type?: string) => {
    await _createCategory({
      variables: {
        name,
        type,
      },
    });
  };

  return [createCategory];
};
