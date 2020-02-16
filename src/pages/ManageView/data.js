import { useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import { gql } from 'apollo-boost';
import moment from 'moment';
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
