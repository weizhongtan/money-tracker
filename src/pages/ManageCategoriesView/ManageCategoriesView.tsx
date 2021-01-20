import {
  CloseSquareTwoTone,
  DeleteTwoTone,
  FolderAddTwoTone,
  FolderTwoTone,
  MinusSquareTwoTone,
  PlusSquareTwoTone,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, Table, Tooltip } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { Radio } from '../../components';
import { useBaseData } from '../../lib';
import { Category, Nullable, TimePeriod } from '../../types';
import { useCreateCategory, useDeleteCategory } from './data';

const { Column } = Table;

const IncomeIcon = styled(PlusSquareTwoTone).attrs(({ theme }) => ({
  twoToneColor: theme.positive,
}))`
  color: ${({ theme: { positive } }) => positive};
`;

const ExpenseIcon = styled(MinusSquareTwoTone).attrs(({ theme }) => ({
  twoToneColor: theme.negative,
}))`
  color: ${({ theme: { negative } }) => negative};
`;

function getTypeIcon(type: Nullable<string>): React.FC {
  switch (type) {
    case 'expense': {
      return ExpenseIcon;
    }
    case 'income': {
      return IncomeIcon;
    }
    default: {
      return CloseSquareTwoTone;
    }
  }
}

const DeleteIcon = styled(DeleteTwoTone).attrs(({ theme }) => ({
  twoToneColor: theme.negative,
}))``;

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
    <Button
      danger
      onClick={handleDelete}
      loading={loading}
      icon={<DeleteIcon />}
    />
  );
};

type Props = TimePeriod;

const ManageCategoriesView: React.FC<Props> = () => {
  const baseData = useBaseData();
  const createCategory = useCreateCategory();
  const [creating, setCreating] = React.useState(false);

  const onFinish = async (values: {
    name: string;
    type: string;
    isParent: any;
  }) => {
    setCreating(true);
    await createCategory(values.name, values.type, values.isParent);
    setCreating(false);
  };

  return (
    <>
      <Form name="basic" onFinish={onFinish} layout="inline">
        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true }]}
          initialValue="expense"
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="expense">Expense</Radio.Button>
            <Radio.Button value="income">Income</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="isParent" initialValue={false} valuePropName="checked">
          <Checkbox>Parent?</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={creating} htmlType="submit">
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
          title="Details"
          render={(_, { type, isParent, parent }) => {
            const TypeIcon = getTypeIcon(type);
            return (
              <>
                <Space>
                  <Tooltip title={type}>
                    <TypeIcon />
                  </Tooltip>
                  {isParent && (
                    <Tooltip title="Parent category">
                      <FolderAddTwoTone />
                    </Tooltip>
                  )}
                  {parent && (
                    <Tooltip title={`Child of ${parent.name}`}>
                      <FolderTwoTone />
                    </Tooltip>
                  )}
                </Space>
              </>
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
