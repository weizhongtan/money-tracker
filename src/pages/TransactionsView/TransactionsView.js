import { Icon as LegacyIcon } from '@ant-design/compatible';
import {
  Affix,
  Avatar,
  Badge,
  Button,
  Drawer,
  Input,
  Table,
  Tooltip,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import { Amount, ButtonSelect, Select } from '../../components';
import { CategoriesList, toMoney, useBaseData, useTheme } from '../../lib';
import { useTransactions, useUpdateTransactionsCategory } from './data';

const { Option } = Select;
const { Column } = Table;
const Search = styled(Input.Search)`
  width: 100%;
`;

const Parent = styled.span`
  color: ${({ theme }) => theme.neutral};
`;

const TransactionsView = ({ startDate, endDate, categoryId }) => {
  const theme = useTheme();
  const baseData = useBaseData();

  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const categories = new CategoriesList(baseData.categories);

  const [
    updateTransactionsCategory,
    pairTransactions,
  ] = useUpdateTransactionsCategory(categories);
  const { loading, error, transactions, count } = useTransactions({
    startDate,
    endDate,
    categoryId,
    searchText,
  });
  if (loading && typeof transactions === 'undefined') return null;
  if (error) return 'error';

  const avatars = baseData.accounts.reduce((acc, { name }, index) => {
    return {
      ...acc,
      [name]: (
        <>
          <Tooltip title={name}>
            <Avatar
              style={{
                background: Object.entries(
                  theme.colors.presetPrimaryColors
                ).find((_, _index) => index === _index)[1],
              }}
              size="small"
            >
              {name[0]}
            </Avatar>
          </Tooltip>
        </>
      ),
    };
  }, {});

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
          onChange={(id, { props }) => {
            updateTransactionsCategory({
              transactionIds: selectedRows.map(x => x.key),
              newCategoryFullName: props.label,
              newCategoryId: id,
              currentCategoryIds: selectedRows.map(x => x.category?.id),
            });
            setSelectedRows([]);
          }}
          showSearch
          optionFilterProp="label"
        >
          {categories.get().map(({ id, fullName, isSub }) => (
            <Option key={id} label={fullName}>
              {isSub ? fullName : <Parent>{fullName}</Parent>}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => setSelectedRows([])}>
          Deselect {selectedRows.length} row(s)
        </Button>
        {selectedRows.length === 2 && (
          <Button
            type="primary"
            onClick={() => {
              const transactionIds = selectedRows.map(x => x.key);
              const toAccountIds = selectedRows.map(x => x.account.to.id);
              const amounts = selectedRows.map(x => x.amount.value);
              const pairIds = selectedRows.map(x => x.pairId);
              pairTransactions({
                transactionIds,
                toAccountIds,
                amounts,
                pairIds,
              });
              setSelectedRows([]);
            }}
          >
            Pair transactions
          </Button>
        )}
      </Drawer>
      <Affix offsetTop={0.01}>
        <DebounceInput
          minLength={2}
          debounceTimeout={500}
          element={Search}
          placeholder="Search..."
          value={searchText}
          onChange={event => {
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
          selectedRowKeys: selectedRows.map(x => x.key),
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        size="small"
      >
        <Column
          title="Date"
          dataIndex="date"
          key="date"
          // render={date => }
          render={date => (
            <Tooltip title={<TimeAgo date={date} />}>
              {moment(date).format('DD/MM/YY')}
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
          onFilter={(value, record) => record.account.to.name === value}
          render={({ to, from }, record) => {
            const { isOut } = record.amount;
            const arrow = (
              <LegacyIcon type={isOut ? 'arrow-right' : 'arrow-left'} />
            );
            return (
              <>
                {avatars[to.name]}
                {from.name && (
                  <>
                    {' '}
                    {arrow} {avatars[from.name]}
                  </>
                )}
              </>
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
          sorter={(a, b) => a.amount.value - b.amount.value}
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
          onFilter={(value, record) => record.category.fullName === value}
          render={({ fullName, id: categoryId }, record) => {
            return (
              <ButtonSelect
                value={categoryId}
                onChange={newCategoryId => {
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
                  <Option key={id} label={fullName}>
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
