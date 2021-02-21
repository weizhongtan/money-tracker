import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleTwoTone,
  FilterOutlined,
} from '@ant-design/icons';
import {
  Affix,
  Badge,
  Button,
  Drawer,
  Input,
  Space,
  Table,
  Tooltip,
} from 'antd';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';

import { Filters } from '../../App';
import {
  AccountAvatar,
  Amount,
  ButtonSelect,
  DateDisplay,
} from '../../components';
import Select, { SelectProps } from '../../components/Select';
import { useBaseData, useTheme } from '../../lib';
import {
  Account,
  Category,
  Nullable,
  TimePeriod,
  Transaction,
} from '../../types';
import { useTransactions, useUpdateTransactions } from './data';

const { Option } = Select;
const { Column } = Table;

const Search = styled(Input.Search)`
  width: 100%;
`;

type AccountIndicatorProps = {
  to: Pick<Account, 'name' | 'colour'>;
  isOut: boolean;
  onClick?(): void;
  linked: Nullable<Pick<Account, 'name' | 'colour'>>;
};

const AccountIndicator: React.FC<AccountIndicatorProps> = ({
  to,
  linked,
  isOut,
}) => {
  const arrow = isOut ? <ArrowRightOutlined /> : <ArrowLeftOutlined />;
  return (
    <Tooltip
      title={() => (
        <>
          {to.name}
          {linked?.name && (
            <>
              {' '}
              {arrow} {linked?.name}
            </>
          )}
        </>
      )}
    >
      <div>
        <AccountAvatar name={to.name} colour={to.colour} />
        {linked?.name && (
          <>
            {' '}
            {arrow}{' '}
            <AccountAvatar name={linked?.name} colour={linked?.colour} />
          </>
        )}
      </div>
    </Tooltip>
  );
};

type RowActionsDrawerProps = {
  categories: Category[];
  selectedRows: Transaction[];
  setSelectedRows: (t: Transaction[]) => void;
};

const RowActionsDrawer: React.FC<RowActionsDrawerProps> = ({
  categories,
  selectedRows,
  setSelectedRows,
}) => {
  const [
    updateTransactionsCategory,
    deleteTransactions,
    pairTransactions,
    unpairTransactions,
  ] = useUpdateTransactions();

  return (
    <Drawer
      placement="right"
      closable={false}
      visible={!!selectedRows.length}
      mask={false}
      bodyStyle={{ padding: '10px' }}
      width={320}
    >
      <Space direction="vertical">
        <Select<React.FC<SelectProps<string>>>
          value="Select category"
          onSelect={(id) => {
            updateTransactionsCategory({
              transactionIds: selectedRows.map((x) => x.id),
              newCategoryId: id,
              currentCategoryIds: selectedRows.map((x) => x.category.id),
            });
            setSelectedRows([]);
          }}
          showSearch
          optionFilterProp="label"
        >
          {categories.map(({ id, name }) => (
            <Option value={id} key={id} label={name}>
              {name}
            </Option>
          ))}
        </Select>
        <Button onClick={() => setSelectedRows([])} block>
          Deselect {selectedRows.length} row(s)
        </Button>
        <Button
          type="primary"
          onClick={() => {
            const transactionIds = selectedRows.map((x) => x.id);
            const accountIds = selectedRows.map((x) => x.account.id);
            const amounts = selectedRows.map((x) => x.amount);
            const pairIds = selectedRows.map((x) => x.pair_id);
            setSelectedRows([]);
            pairTransactions({
              transactionIds,
              accountIds,
              amounts,
              pairIds,
            });
          }}
          disabled={selectedRows.length !== 2}
          block
        >
          Pair transactions
        </Button>
        <Button
          danger
          onClick={() => {
            const pairIds = selectedRows
              .map((x) => x.pair_id)
              .filter((y): y is string => typeof y === 'string');
            unpairTransactions({
              pairIds,
            });
            setSelectedRows([]);
          }}
          block
        >
          Unpair transactions
        </Button>
        <Button
          danger
          onClick={async () => {
            deleteTransactions({
              transactionIds: selectedRows.map((x) => x.id),
            });
            setSelectedRows([]);
          }}
          block
        >
          Delete {selectedRows.length} row(s)
        </Button>
      </Space>
    </Drawer>
  );
};

type FilterByButtonProps = {
  title: string;
  onClick(): void;
};

const FilterByButton: React.FC<FilterByButtonProps> = ({ title, onClick }) => {
  return (
    <Tooltip title={title}>
      <FilterOutlined onClick={onClick} />
    </Tooltip>
  );
};

type TransactionsViewProps = TimePeriod & Omit<Filters, 'showControls'>;

const TransactionsView: React.FC<TransactionsViewProps> = ({
  startDate,
  endDate,
  accountIdFilter,
  setAccountIdFilter,
  categoryIdFilter,
  setCategoryIdFilter,
}) => {
  const baseData = useBaseData();
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);

  // don't allow parent categories to be assigned to a transaction
  const categories = baseData.categories.filter((c) => !c.isParent);

  const [updateTransactionsCategory] = useUpdateTransactions();
  const { loading, error, transactions, count } = useTransactions({
    startDate,
    endDate,
    categoryId: categoryIdFilter,
    accountId: accountIdFilter,
    searchText,
  });
  if (error) return <>error</>;

  return (
    <div>
      <RowActionsDrawer
        categories={categories}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Affix offsetTop={64.01}>
        <DebounceInput
          minLength={2}
          debounceTimeout={500}
          element={Search}
          placeholder="Search..."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          loading={loading}
          autoFocus
          addonAfter={
            <Badge
              count={count}
              showZero
              overflowCount={Number.MAX_SAFE_INTEGER}
              style={{ backgroundColor: theme.positive }}
            />
          }
        />
      </Affix>
      <Table<Transaction>
        dataSource={transactions}
        pagination={{
          defaultPageSize: 50,
        }}
        rowSelection={{
          selectedRowKeys: selectedRows.map((x) => x.id),
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        size="small"
        loading={loading}
      >
        <Column<Transaction>
          title="Date"
          dataIndex="date"
          key="date"
          render={(date) => <DateDisplay date={date} />}
        />
        <Column<Transaction>
          title="Account"
          dataIndex="account"
          key="account"
          render={(_, record) => {
            return (
              <Space>
                {setAccountIdFilter && (
                  <FilterByButton
                    title={`Filter to ${record.account.name}`}
                    onClick={() => {
                      setAccountIdFilter(record.account.id);
                    }}
                  />
                )}
                <AccountIndicator
                  to={record.account}
                  linked={record.linkedAccount}
                  isOut={record.amount < 0}
                />
              </Space>
            );
          }}
        />
        <Column<Transaction>
          title="Amount"
          dataIndex="amount"
          key="amount"
          render={(_, { amount }) => <Amount value={amount} />}
          sorter={(a, b) => a.amount - b.amount}
          align="right"
        />
        <Column<Transaction>
          title="Description"
          dataIndex="description"
          key="description"
          render={(description, record) => {
            return (
              <>
                {!!record.original_id && (
                  <Tooltip title={`Original ID: ${record.original_id}`}>
                    <CheckCircleTwoTone twoToneColor={theme.positive} />
                  </Tooltip>
                )}{' '}
                {description}
              </>
            );
          }}
        />
        <Column<Transaction>
          title="Category"
          dataIndex="category"
          key="category"
          render={(_, record) => {
            return (
              <Space>
                {setCategoryIdFilter && (
                  <FilterByButton
                    title={`Filter to ${record.category.name}`}
                    onClick={() => {
                      setCategoryIdFilter(record.category.id);
                    }}
                  />
                )}
                <ButtonSelect
                  value={record.category.id}
                  onChange={(newCategoryId) => {
                    updateTransactionsCategory({
                      transactionIds: [record.id],
                      newCategoryId: newCategoryId,
                      currentCategoryIds: [record.category.id],
                    });
                  }}
                  showSearch
                  optionFilterProp="label"
                  size="small"
                  buttonText={record.category.name}
                  buttonType={
                    record.category.name === 'None' ? 'primary' : 'dashed'
                  }
                >
                  {categories.map(({ id, name }) => (
                    <Option value={id} key={id} label={name}>
                      {name}
                    </Option>
                  ))}
                </ButtonSelect>
              </Space>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default TransactionsView;
