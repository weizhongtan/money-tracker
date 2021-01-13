import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
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

import {
  AccountAvatar,
  Amount,
  ButtonSelect,
  DateDisplay,
  Select,
} from '../../components';
import { CategoriesList, toMoney, useBaseData, useTheme } from '../../lib';
import { Account, TimePeriod, Transaction } from '../../types';
import { useTransactions, useUpdateTransactions } from './data';

const { Option } = Select;
const { Column } = Table;

const Search = styled(Input.Search)`
  width: 100%;
`;

const Parent = styled.span`
  color: ${({ theme }) => theme.neutral};
`;

type AccountIndicatorProps = {
  to: Account;
  isOut: boolean;
  onClick?: () => void;
  linked?: Account;
};

const AccountIndicator: React.FC<AccountIndicatorProps> = ({
  to,
  linked,
  isOut,
  onClick,
}) => {
  const arrow = isOut ? <ArrowRightOutlined /> : <ArrowLeftOutlined />;
  return (
    <Tooltip
      title={() => (
        <>
          Filter to {to.name}
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
        <AccountAvatar name={to.name} colour={to.colour} onClick={onClick} />
        {linked?.name && (
          <>
            {' '}
            {arrow}{' '}
            <AccountAvatar
              name={linked?.name}
              colour={linked?.colour}
              onClick={onClick}
            />
          </>
        )}
      </div>
    </Tooltip>
  );
};

type RowActionsDrawerProps = {
  selectedRows: Transaction[];
  setSelectedRows: (t: Transaction[]) => void;
};

const RowActionsDrawer: React.FC<RowActionsDrawerProps> = ({
  selectedRows,
  setSelectedRows,
}) => {
  const baseData = useBaseData();
  const [
    updateTransactionsCategory,
    deleteTransactions,
    pairTransactions,
    unpairTransactions,
  ] = useUpdateTransactions();

  const categories = new CategoriesList(baseData.categories);

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
        <Select
          value="Select category"
          onSelect={(id) => {
            updateTransactionsCategory({
              transactionIds: selectedRows.map((x) => x.key),
              newCategoryId: id as string,
              currentCategoryIds: selectedRows.map((x) => x.category?.id),
            });
            setSelectedRows([]);
          }}
          showSearch
          optionFilterProp="label"
        >
          {categories.get().map(({ id, name, isSub }) => (
            <Option value={id} key={id} label={name}>
              {isSub ? name : <Parent>{name}</Parent>}
            </Option>
          ))}
        </Select>
        <Button onClick={() => setSelectedRows([])} block>
          Deselect {selectedRows.length} row(s)
        </Button>
        <Button
          type="primary"
          onClick={() => {
            const transactionIds = selectedRows.map((x) => x.key);
            const accountIds = selectedRows.map((x) => x.account.id);
            const amounts = selectedRows.map((x) => x.amount.value);
            const pairIds = selectedRows.map((x) => x.pairId);
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
              .map((x) => x.pairId)
              .filter((y) => typeof y === 'string');
            if (!pairIds.length) {
              return;
            }
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
              transactionIds: selectedRows.map((x) => x.key),
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

type TransactionsViewProps = TimePeriod & {
  categoryId?: string;
};

const TransactionsView: React.FC<TransactionsViewProps> = ({
  startDate,
  endDate,
  categoryId,
}) => {
  const baseData = useBaseData();
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);
  const [accountNameFilter, setAccountNameFilter] = useState<any[] | null>([]);

  const categories = new CategoriesList(baseData.categories);

  const [updateTransactionsCategory] = useUpdateTransactions();
  const { loading, error, transactions, count } = useTransactions({
    startDate,
    endDate,
    categoryId,
    searchText,
  });
  if (error) return <>error</>;

  return (
    <div>
      <RowActionsDrawer
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Affix offsetTop={0.01}>
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
              overflowCount={Number.MAX_SAFE_INTEGER}
              style={{ backgroundColor: theme.positive }}
            />
          }
        />
      </Affix>
      {
        <Table<Transaction>
          dataSource={transactions}
          pagination={{
            defaultPageSize: 50,
          }}
          rowSelection={{
            selectedRowKeys: selectedRows.map((x) => x.key),
            onChange: (_, rows) => setSelectedRows(rows),
          }}
          size="small"
          loading={loading}
          onChange={(pagination, filters, sorter) => {
            setAccountNameFilter(filters.account);
          }}
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
            filteredValue={accountNameFilter}
            filters={baseData.accounts.map(({ name }) => ({
              text: name,
              value: name,
            }))}
            onFilter={(value, record) => record.account.name === value}
            render={(_, record) => {
              return (
                <AccountIndicator
                  to={record.account}
                  linked={record.linkedAccount}
                  isOut={record.amount.isOut}
                  onClick={() => {
                    setAccountNameFilter([record.account.name]);
                  }}
                />
              );
            }}
          />
          <Column
            title="Amount"
            dataIndex="amount"
            key="amount"
            render={({ value, isOut }) => (
              <Amount positive={!isOut}>{toMoney(value, false)}</Amount>
            )}
            sorter={(a: Transaction, b: Transaction) =>
              a.amount.value - b.amount.value
            }
            align="right"
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="Category"
            dataIndex="category"
            key="category"
            filters={categories.get().map(({ name }) => ({
              text: name,
              value: name,
            }))}
            onFilter={(value, record: Transaction) =>
              record.category?.name === value
            }
            render={(_, record) => {
              return (
                <ButtonSelect
                  value={record.category?.id}
                  onChange={(newCategoryId) => {
                    if (typeof newCategoryId === 'string') {
                      updateTransactionsCategory({
                        transactionIds: [record.key],
                        newCategoryId,
                        currentCategoryIds: [record.category?.id],
                      });
                    }
                  }}
                  showSearch
                  optionFilterProp="label"
                  size="small"
                  buttonText={record.category?.name}
                  buttonTextDefault="Set category"
                >
                  {categories.get().map(({ id, name, isSub }) => (
                    <Option value={id} key={id} label={name}>
                      {isSub ? name : <Parent>{name}</Parent>}
                    </Option>
                  ))}
                </ButtonSelect>
              );
            }}
          />
        </Table>
      }
    </div>
  );
};

export default TransactionsView;
