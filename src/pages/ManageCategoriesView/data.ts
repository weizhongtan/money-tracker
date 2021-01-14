import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { GET_BASE_DATA, GetBaseData } from '../../App/data';
import { Category } from '../../types';

const CREATE_CATEGORY = gql`
  mutation MyMutation($name: String!, $type: String) {
    insert_categories(objects: { name: $name, type: $type }) {
      affected_rows
      returning {
        id
        key: id
        name
        type
      }
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation MyMutation($id: uuid) {
    delete_categories(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        key: id
        name
        type
      }
    }
  }
`;

interface CategoryDetails {
  insert_categories: {
    affected_rows: number;
    returning: Category[];
  };
}

export const useCreateCategory = () => {
  const [_createCategory] = useMutation<CategoryDetails>(CREATE_CATEGORY, {
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

export const useDeleteCategory = () => {
  const [_deleteCategory] = useMutation(DELETE_CATEGORY, {
    update(cache, { data }) {
      const deletedCategory = data?.delete_categories.returning[0];
      const existingData = cache.readQuery<GetBaseData>({
        query: GET_BASE_DATA,
      });

      if (existingData && deletedCategory) {
        cache.writeQuery({
          query: GET_BASE_DATA,
          data: {
            ...existingData,
            categories: existingData.categories.filter(
              (cat) => cat.id !== deletedCategory.id
            ),
          },
        });
      }
    },
  });

  const deleteCategory = async (id: string) => {
    await _deleteCategory({
      variables: {
        id,
      },
    });
  };

  return [deleteCategory];
};
