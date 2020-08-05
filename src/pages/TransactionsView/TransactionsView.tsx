import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Affix, Badge, Button, Drawer, Input, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import { AccountAvatar, Amount, ButtonSelect, Select } from '../../components';
import { CategoriesList, toMoney, useBaseData } from '../../lib';
import { Account, Transaction } from '../../types';
import { useTransactions, useUpdateTransactionsCategory } from './data';

const { Option } = Select;
const { Column } = Table;

const Search = styled(Input.Search)`
  width: 100%;
`;

const Parent = styled.span`
  color: ${({ theme }) => theme.neutral};
`;

const AccountIndicator = ({
  to,
  linked,
  isOut,
}: {
  to: Account;
  linked: Account;
  isOut: boolean;
}) => {
  const arrow = isOut ? <ArrowRightOutlined /> : <ArrowLeftOutlined />;
  if (!to.name) return null;
  return (
    <Tooltip
      title={() => (
        <>
          {to.name}
          {linked.name && (
            <>
              {' '}
              {arrow} {linked.name}
            </>
          )}
        </>
      )}
    >
      <div>
        <AccountAvatar name={to.name} colour={to.colour} />
        {linked.name && (
          <>
            {' '}
            {arrow} <AccountAvatar name={linked.name} colour={linked.colour} />
          </>
        )}
      </div>
    </Tooltip>
  );
};

const TransactionsView = ({
  startDate,
  endDate,
  categoryId,
}: {
  startDate: Date;
  endDate: Date;
  categoryId: string;
}) => {
  const baseData = useBaseData();

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);

  const categories = new CategoriesList(baseData.categories);

  const [
    updateTransactionsCategory,
    deleteTransactions,
    pairTransactions,
    unpairTransactions,
  ] = useUpdateTransactionsCategory(categories);
  const { loading, error, transactions, count } = useTransactions({
    startDate,
    endDate,
    categoryId,
    searchText,
  });
  if (loading && typeof transactions === 'undefined') return null;
  if (error) return 'error';

  return (
    <>
      <Drawer
        placement="top"
        closable={false}
        visible={!!selectedRows.length}
        mask={false}
        height={52}
        bodyStyle={{ padding: '10px' }}
      >
        <Select
          placeholder="Select category"
          onChange={(id, option) => {
            updateTransactionsCategory({
              transactionIds: selectedRows.map((x) => x.key),
              newCategoryFullName: 'props' in option ? option.props.label : '',
              newCategoryId: id,
              currentCategoryIds: selectedRows.map((x) => x.category?.id),
            });
            setSelectedRows([]);
          }}
          showSearch
          optionFilterProp="label"
        >
          {categories.get().map(({ id, fullName, isSub }) => (
            <Option value={id} key={id} label={fullName}>
              {isSub ? fullName : <Parent>{fullName}</Parent>}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => setSelectedRows([])}>
          Deselect {selectedRows.length} row(s)
        </Button>
        {selectedRows.length === 2 && (
          <>
            <Button
              type="primary"
              onClick={() => {
                const transactionIds = selectedRows.map((x) => x.key);
                const accountIds = selectedRows.map((x) => x.account.to.id);
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
            >
              Pair transactions
            </Button>
          </>
        )}
        <Button
          type="primary"
          danger
          onClick={() => {
            unpairTransactions({
              transactionIds: selectedRows.map((x) => x.key),
              pairIds: selectedRows.map((x) => x.pairId),
            });
            setSelectedRows([]);
          }}
        >
          Unpair transactions
        </Button>
        <Button
          type="primary"
          danger
          onClick={async () => {
            deleteTransactions({
              transactionIds: selectedRows.map((x) => x.key),
            });
            setSelectedRows([]);
          }}
        >
          Delete {selectedRows.length} row(s)
        </Button>
      </Drawer>
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
              style={{ backgroundColor: '#52c41a' }}
            />
          }
        />
      </Affix>
      <Table
        dataSource={transactions}
        pagination={{
          defaultPageSize: 50,
        }}
        rowSelection={{
          selectedRowKeys: selectedRows.map((x) => x.key),
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        size="small"
      >
        <Column
          title="Date"
          dataIndex="date"
          key="date"
          render={(date) => (
            <Tooltip title={<TimeAgo date={date} />}>
              <>{moment(date).format('DD/MM/YY')}</>
            </Tooltip>
          )}
        />
        <Column
          title="Account"
          dataIndex="account"
          key="account"
          filters={baseData.accounts.map(({ name }) => ({
            text: name,
            value: name,
          }))}
          onFilter={(value, record: Transaction) =>
            record.account.to.name === value
          }
          render={({ to, linked }, record) => {
            return (
              <AccountIndicator
                to={to}
                linked={linked}
                isOut={record.amount.isOut}
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
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Category"
          dataIndex="category"
          key="category"
          filters={categories.get().map(({ fullName }) => ({
            text: fullName,
            value: fullName,
          }))}
          onFilter={(value, record: Transaction) =>
            record.category?.fullName === value
          }
          render={({ fullName, id: categoryId }, record) => {
            return (
              <ButtonSelect
                value={categoryId}
                onChange={(newCategoryId: string) => {
                  updateTransactionsCategory({
                    transactionIds: [record.key],
                    newCategoryFullName: fullName,
                    newCategoryId,
                    currentCategoryIds: [categoryId],
                  });
                }}
                showSearch
                optionFilterProp="label"
                size="small"
                buttonText={fullName}
                buttonTextDefault="Set category"
              >
                {categories.get().map(({ id, fullName, isSub }) => (
                  <Option value={id} key={id} label={fullName}>
                    {isSub ? fullName : <Parent>{fullName}</Parent>}
                  </Option>
                ))}
              </ButtonSelect>
            );
          }}
        />
      </Table>
    </>
  );
};

export default TransactionsView;
