import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { useBaseData } from '../../lib';
import { Category, TimePeriod } from '../../types';

const { Column } = Table;

type Props = TimePeriod;

const ManageCategoriesView: React.FC<Props> = () => {
  const baseData = useBaseData();

  return (
    <>
      <Table
        dataSource={baseData.categories} // remove null category
        pagination={{
          defaultPageSize: 50,
        }}
        size="small"
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column<Category>
          title="Type"
          key="type"
          render={(_, { type }) => {
            const isExpense = type === 'expense';
            const Icon = isExpense ? MinusCircleOutlined : PlusCircleOutlined;
            const TypeIcon = styled(Icon)`
              color: ${({ theme: { positive, neutral } }) =>
                isExpense ? neutral : positive};
            `;
            return (
              <Tooltip title={type}>
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
