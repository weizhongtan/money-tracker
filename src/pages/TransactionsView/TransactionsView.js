import { Affix, Avatar, Button, Drawer, Icon, Input, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import TimeAgo from 'react-timeago';
import styled, { ThemeContext } from 'styled-components';

import { ButtonSelect, Select } from '../../components';
import { BaseDataContext, CategoriesList, toMoney } from '../../lib';
import { useTransactions, useUpdateTransactionsCategory } from './data';

const { Option } = Select;
const { Column } = Table;
const { Search } = Input;

const Amount = styled.span`
  display: block;
  text-align: right;
  color: ${({ positive, theme }) =>
    positive ? theme.positive : theme.neutral};
`;

const Parent = styled.span`
  color: ${({ theme }) => theme.neutral};
`;

const TransactionsView = ({ startDate, endDate }) => {
  const theme = useContext(ThemeContext);
  const baseData = useContext(BaseDataContext);

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
    searchText,
  });
  if (loading && typeof transactions === 'undefined') return null;
  if (error) return 'error';

  const avatars = baseData.accounts.reduce((acc, { name }, index) => {
    return {
      ...acc,
      [name]: (
        <>
          <Avatar
            style={{
              background: Object.entries(theme.colors.presetPrimaryColors).find(
                (_, _index) => index === _index
              )[1],
            }}
            size="small"
          >
            {name[0]}
          </Avatar>{' '}
          {name}
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
        bodyStyle={{
          padding: '10px',
        }}
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
              console.log(selectedRows);
              const transactionIds = selectedRows.map(x => x.key);
              const toAccountIds = selectedRows.map(x => x.account.to.id);
              const amounts = selectedRows.map(x => Math.abs(x.amount.value));
              pairTransactions({
                transactionIds,
                toAccountIds,
                amounts,
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
        />
        <span>{count} records</span>
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
          // render={date => <TimeAgo date={date} />}
          render={date => date.toDateString()}
        />
        <Column
          title="Account"
          dataIndex="account"
          key="account"
          filters={baseData.accounts.map(({ name }) => ({
            text: name,
            value: name,
          }))}
          onFilter={(value, record) => record.account === value}
          render={({ to, from }, record) => {
            const { isOut } = record.amount;
            const arrow = <Icon type={isOut ? 'right' : 'left'} />;
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
        />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Category"
          dataIndex="category"
          key="category"
          filters={categories.get().map(({ name }) => ({
            text: name,
            value: name,
          }))}
          onFilter={(value, record) => record.category === value}
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
