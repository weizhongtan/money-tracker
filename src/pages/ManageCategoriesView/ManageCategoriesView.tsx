import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Table, Tooltip } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { useBaseData } from '../../lib';
import { Category, TimePeriod } from '../../types';
import { useCreateCategory } from './data';

const { Column } = Table;

type Props = TimePeriod;

const ManageCategoriesView: React.FC<Props> = () => {
  const baseData = useBaseData();
  const [createCategory] = useCreateCategory();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    await createCategory(values.name);
    setLoading(false);
  };

  return (
    <>
      <Form name="basic" onFinish={onFinish} layout="inline">
        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: 'Enter category name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={baseData.categories}
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
            const Icon = isExpense ? MinusCircleFilled : PlusCircleFilled;
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
