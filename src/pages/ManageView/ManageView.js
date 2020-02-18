import { Table } from 'antd';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ButtonSelect, Radio, Select } from '../../components';
import { BaseDataContext, CategoriesList, toMoney } from '../../lib';
import { useUpdateCategory } from './data';

const { Option } = Select;
const { Column } = Table;

const ManageView = ({ startDate, endDate }) => {
  const baseData = useContext(BaseDataContext);

  console.log(typeof useUpdateCategory);
  const [updateCategory] = useUpdateCategory();

  const categories = new CategoriesList(baseData.categories);

  console.log(categories);

  return (
    <>
      <Table
        dataSource={categories.get()}
        pagination={{
          defaultPageSize: 50,
        }}
        size="small"
      >
        <Column title="Name" dataIndex="name" render={name => name} />
        <Column
          title="Parent Category"
          dataIndex="parent"
          render={({ name, id }) => {
            return (
              <ButtonSelect
                value={id}
                onChange={({ id, fullName }) => {
                  updateCategory();
                }}
                showSearch
                optionFilterProp="label"
                size="small"
                buttonText={name}
                buttonTextDefault="Set parent id"
              >
                {categories.get().map(
                  ({ id, fullName, isSub }) =>
                    !isSub && (
                      <Option key={id} label={fullName}>
                        {fullName}
                      </Option>
                    )
                )}
              </ButtonSelect>
            );
          }}
        />
        <Column title="Type" dataIndex="type" render={name => name} />
      </Table>
    </>
  );
};

export default ManageView;
