import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Radio, Select, Wrapper } from '../../components';
import { BaseDataContext, CategoriesList, toMoney } from '../../lib';

const { Option } = Select;

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
  return useMutation(UPDATE_CATEGORY);
};
