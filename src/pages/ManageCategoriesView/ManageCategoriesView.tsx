import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ButtonSelect, Select } from '../../components';
import { CategoriesList, useBaseData } from '../../lib';
import { Category, TimePeriod } from '../../types';
import { useUpdateCategory } from './data';

const { Option } = Select;
const { Column } = Table;

type Props = TimePeriod;

const ManageCategoriesView: React.FC<Props> = () => {
  const baseData = useBaseData();

  const [updateCategory] = useUpdateCategory();

  const categories = new CategoriesList([
    {
      id: 'none',
      key: 'none',
      name: '❌',
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
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Parent Category"
          dataIndex="parent"
          key="parent"
          render={(parent, record: Category) => {
            return (
              <ButtonSelect
                value={parent.id}
                onChange={(id: string) => {
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
                  .map(({ id, name }) => (
                    <Option
                      key={id}
                      value={id}
                      label={name}
                      disabled={id === record.id}
                    >
                      {name}
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
          render={(name) => {
            const isExpense = name === 'expense';
            const Icon = isExpense ? MinusCircleOutlined : PlusCircleOutlined;
            const TypeIcon = styled(Icon)`
              color: ${({ theme: { positive, neutral } }) =>
                isExpense ? neutral : positive};
            `;
            return (
              <Tooltip title={name}>
                <TypeIcon />
              </Tooltip>
            );
          }}
        />
      </Table>
    </>
  );
};

export default ManageCategoriesView;
