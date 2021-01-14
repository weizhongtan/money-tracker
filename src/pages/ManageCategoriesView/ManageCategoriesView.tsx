import {
  DeleteOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Button, Form, Input, Table, Tooltip } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { useBaseData } from '../../lib';
import { Category, TimePeriod } from '../../types';
import { useCreateCategory, useDeleteCategory } from './data';

const { Column } = Table;

const IncomeIcon = styled(PlusCircleFilled)`
  color: ${({ theme: { positive } }) => positive};
`;

const ExpenseIcon = styled(MinusCircleFilled)`
  color: ${({ theme: { negative } }) => negative};
`;

type DeleteButtonProps = {
  id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [deleteCategory] = useDeleteCategory();
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteCategory(id);
    // no need to reset loading since component is unmounted
  };

  return (
    <Button danger onClick={handleDelete} loading={loading}>
      <DeleteOutlined />
    </Button>
  );
};

type Props = TimePeriod;

const ManageCategoriesView: React.FC<Props> = () => {
  const baseData = useBaseData();
  const [createCategory] = useCreateCategory();
  const [creating, setCreating] = React.useState(false);

  const onFinish = async (values: { name: string }) => {
    setCreating(true);
    await createCategory(values.name);
    setCreating(false);
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
          <Button type="primary" loading={creating}>
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
            const Icon = type === 'expense' ? ExpenseIcon : IncomeIcon;
            return (
              <Tooltip title={type}>
                <Icon />
              </Tooltip>
            );
          }}
        />
        <Column<Category>
          title="Actions"
          dataIndex="id"
          key="id"
          render={(_, { id }) => {
            return <DeleteButton id={id} />;
          }}
        />
      </Table>
    </>
  );
};

export default ManageCategoriesView;
