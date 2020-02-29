import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Table, Tooltip } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { ButtonSelect, Select } from '../../components';
import { BaseDataContext, CategoriesList } from '../../lib';
import { useUpdateCategory } from './data';

const { Option } = Select;
const { Column } = Table;

const ManageView = ({ startDate, endDate }) => {
  const baseData = useContext(BaseDataContext);

  const [updateCategory] = useUpdateCategory();

  const categories = new CategoriesList([
    {
      id: 'none',
      fullName: '❌',
      parent: {},
    },
    ...baseData.categories,
  ]);

  console.log(categories);

  return (
    <>
      <Table
        dataSource={categories.get().slice(1)} // remove null category
        pagination={{
          defaultPageSize: 50,
        }}
        size="small"
      >
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          render={name => name}
        />
        <Column
          title="Parent Category"
          dataIndex="parent"
          key="parent"
          render={(parent, record) => {
            return (
              <ButtonSelect
                value={parent.id}
                onChange={id => {
                  updateCategory({
                    record,
                    newParentCategoryId: id === 'none' ? null : id,
                  });
                }}
                showSearch
                optionFilterProp="label"
                size="small"
                buttonText={parent.name}
                buttonTextDefault="Set parent category"
              >
                {categories
                  .get()
                  .filter(({ isSub }) => !isSub)
                  .map(({ id, fullName }) => (
                    <Option
                      key={id}
                      label={fullName}
                      disabled={id === record.id}
                    >
                      {fullName}
                    </Option>
                  ))}
              </ButtonSelect>
            );
          }}
        />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={name => {
            const isExpense = name === 'expense';
            const TypeIcon = styled(LegacyIcon)`
              color: ${({ theme: { positive, neutral } }) =>
                isExpense ? neutral : positive};
            `;
            return (
              <Tooltip title={name}>
                <TypeIcon type={isExpense ? 'minus-circle' : 'plus-circle'} />
              </Tooltip>
            );
          }}
        />
      </Table>
    </>
  );
};

export default ManageView;
