import {
  GetBaseDataDocument,
  GetBaseDataQuery,
  UpdateCategoryMutationVariables,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '../../generated/graphql';
import { Category } from '../../types';

export const useCreateCategory = () => {
  const [_createCategory] = useCreateCategoryMutation({
    update(cache, { data }) {
      const newCategory = data?.insert_category?.returning[0];
      const existingData = cache.readQuery<GetBaseDataQuery>({
        query: GetBaseDataDocument,
      });

      if (existingData && newCategory) {
        cache.writeQuery({
          query: GetBaseDataDocument,
          data: {
            ...existingData,
            categories: [newCategory, ...existingData.categories],
          },
        });
      }
    },
  });

  const createCategory = async (
    name: string,
    type: string,
    isParent: boolean
  ) => {
    await _createCategory({
      variables: {
        name,
        type,
        isParent,
      },
    });
  };

  return createCategory;
};

export const useDeleteCategory = () => {
  const [_deleteCategory] = useDeleteCategoryMutation({
    update(cache, { data }) {
      const deletedCategory = data?.delete_category?.returning[0];
      const existingData = cache.readQuery<GetBaseDataQuery>({
        query: GetBaseDataDocument,
      });

      if (existingData && deletedCategory) {
        cache.writeQuery({
          query: GetBaseDataDocument,
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

export const useUpdateCategory = () => {
  return useUpdateCategoryMutation({
    update(cache, { data }) {
      const updatedCategory = data?.update_category?.returning[0];
      const existingData = cache.readQuery<GetBaseDataQuery>({
        query: GetBaseDataDocument,
      });

      if (existingData && updatedCategory) {
        const categoryId = cache.identify(updatedCategory);
        cache.modify({
          id: categoryId,
          fields: {
            name() {
              return updatedCategory.name;
            },
            type() {
              return updatedCategory.type;
            },
            isParent() {
              return updatedCategory.isParent;
            },
            parent() {
              return { __ref: updatedCategory.parent?.id };
            },
          },
          optimistic: true,
        });
      }
    },
  });
};
