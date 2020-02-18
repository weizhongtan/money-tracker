import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';

import { reversible } from '../../lib';

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $categoryId: uuid!
    $parentCategoryId: string
    $name: string
    $type: string
  ) {
    update_categories(
      where: { id: { _eq: $categoryId } }
      _set: { parent_category_id: $parentCategoryId, name: $name, type: $type }
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
      async action({ categoryId, newParentCategoryId, newName, newType }) {
        const { data } = await updateCategory({
          variables: {
            categoryId,
            parentCategoryId: newParentCategoryId,
            name: newName,
            type: newType,
          },
          refetchQueries: ['GetBaseData'],
        });
      },
      async undo() {},
    }),
  ];
};
