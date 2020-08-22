import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { reversible } from '../../lib';

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: uuid!
    $parentCategoryId: uuid
    $name: String
    $type: String
  ) {
    update_categories(
      where: { id: { _eq: $id } }
      _set: {
        parent_category_id: $parentCategoryId
        name: $name
        type: $type
        updated_at: "now"
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const useUpdateCategory = () => {
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  return [
    reversible({
      async action({ record, newParentCategoryId, newName, newType }) {
        await updateCategory({
          variables: {
            id: record.id,
            parentCategoryId: newParentCategoryId,
            name: newName ?? record.name,
            type: newType ?? record.type,
          },
          refetchQueries: ['GetBaseData'],
        });
        return 'Updated';
      },
      async undo(result, { record }) {
        await updateCategory({
          variables: {
            id: record.id,
            parentCategoryId: record.parent.id,
            name: record.name,
            type: record.type,
          },
          refetchQueries: ['GetBaseData'],
        });
        return 'Undid';
      },
    }),
  ];
};
