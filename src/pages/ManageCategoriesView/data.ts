import {
  GetBaseDataDocument,
  GetBaseDataQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../generated/graphql';

export const useCreateCategory = () => {
  const [_createCategory] = useCreateCategoryMutation();

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
