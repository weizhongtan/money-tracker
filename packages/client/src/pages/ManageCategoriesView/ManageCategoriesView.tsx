import {
  CloseSquareTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  FolderAddTwoTone,
  FolderTwoTone,
  MinusSquareTwoTone,
  PlusSquareTwoTone,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Space,
  Spin,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import * as React from 'react';
import styled from 'styled-components';

import { Radio } from '../../components';
import { useBaseData } from '../../lib';
import { Category, Nullable, TimePeriod } from '../../types';
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from './data';

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

const EditIcon = styled(EditTwoTone).attrs(({ theme }) => ({
  twoToneColor: theme.neutral,
}))``;

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

type ActionsDrawerProps = {
  closeDrawer(): void;
  categoryId: Category['id'];
  initialValues: {
    name: Category['name'];
    type: Category['type'];
    isParent: Category['isParent'];
    parentCategoryId?: Category['id'];
  };
} & DrawerProps;

const ActionsDrawer: React.FC<ActionsDrawerProps> = ({
  closeDrawer,
  categoryId,
  initialValues,
  ...props
}) => {
  const [updateCategory] = useUpdateCategory();
  const [loading, setLoading] = React.useState(false);

  const handleFinish = async (values: ActionsDrawerProps['initialValues']) => {
    setLoading(true);
    await updateCategory({
      variables: {
        ids: [categoryId],
        ...values,
        parentCategoryId:
          values.parentCategoryId === '' ? null : values.parentCategoryId,
      },
    });
    setLoading(false);
    closeDrawer();
  };

  return (
    <Drawer placement="right" destroyOnClose width={400} {...props}>
      <Spin spinning={loading}>
        <Form
          name="basic"
          onFinish={handleFinish}
          initialValues={initialValues}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" rules={[{ required: true }]}>
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="expense">Expense</Radio.Button>
              <Radio.Button value="income">Income</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isParent" valuePropName="checked">
            <Checkbox>Parent?</Checkbox>
          </Form.Item>
          <Form.Item label="Parent Category ID" name="parentCategoryId">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

type Props = TimePeriod;

const ManageCategoriesView: React.FC<Props> = () => {
  const baseData = useBaseData();
  const createCategory = useCreateCategory();
  const [creating, setCreating] = React.useState(false);
  const drawerInitialState = {
    visible: false,
    categoryId: '',
    initialValues: {
      name: '',
      type: '',
      isParent: false,
    },
  };
  const [drawerConfig, setDrawerConfig] = React.useState<{
    visible: boolean;
    categoryId: ActionsDrawerProps['categoryId'];
    initialValues: ActionsDrawerProps['initialValues'];
  }>(drawerInitialState);

  const handleFinish = async (values: {
    name: string;
    type: string;
    isParent: boolean;
  }) => {
    setCreating(true);
    await createCategory(values.name, values.type, values.isParent);
    setCreating(false);
  };

  return (
    <>
      <ActionsDrawer
        visible={drawerConfig.visible}
        onClose={() => {
          setDrawerConfig(drawerInitialState);
        }}
        closeDrawer={() => {
          setDrawerConfig(drawerInitialState);
        }}
        categoryId={drawerConfig.categoryId}
        initialValues={drawerConfig.initialValues}
      />
      <Form name="basic" onFinish={handleFinish} layout="inline">
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
          title="ID"
          render={(_, { id }) => {
            return (
              <Typography.Paragraph code copyable>
                {id}
              </Typography.Paragraph>
            );
          }}
        />
        <Column<Category>
          title="Details"
          render={(_, { type, isParent, parent }) => {
            const TypeIcon = getTypeIcon(type);
            return (
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
            );
          }}
        />
        <Column<Category>
          title="Actions"
          dataIndex="id"
          key="id"
          render={(_, { id, name, type, isParent, parent }) => {
            return (
              <Space>
                <Button
                  icon={
                    <EditIcon
                      onClick={() => {
                        setDrawerConfig({
                          visible: true,
                          categoryId: id,
                          initialValues: {
                            name,
                            type,
                            isParent,
                            parentCategoryId: parent?.id,
                          },
                        });
                      }}
                    />
                  }
                />
                <DeleteButton id={id} />
              </Space>
            );
          }}
        />
      </Table>
    </>
  );
};

export default ManageCategoriesView;
