import { useMutation } from '@apollo/react-hooks';
import { Avatar, Button, Drawer, Icon, Input, Table, notification } from 'antd';
import { gql } from 'apollo-boost';
import React, { useContext, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import TimeAgo from 'react-timeago';
import styled, { ThemeContext } from 'styled-components';
import uuid from 'uuid/v4';

import { Select } from '../../components';
import { BaseDataContext, CategoriesList, toMoney } from '../../lib';
import { useTransactions } from './data';

const { Option } = Select;
const { Column } = Table;
const { Search } = Input;

const UPDATE_TRANSACTIONS = gql`
  mutation UpdateTransactions($transactionIds: [uuid!]!, $categoryId: uuid) {
    update_transactions(
      where: { id: { _in: $transactionIds } }
      _set: { category_id: $categoryId, updated_at: "now" }
    ) {
      returning {
        category_id
      }
      affected_rows
    }
  }
`;

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

  const [updateTransaction] = useMutation(UPDATE_TRANSACTIONS);
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

  const categories = new CategoriesList(baseData.categories);

  const updateTransactionsCategory = async ({
    transactionIds,
    newCategoryId,
    currentCategoryIds,
  }) => {
    const { data } = await updateTransaction({
      variables: {
        transactionIds,
        categoryId: newCategoryId,
      },
      refetchQueries: ['GetTransactions'],
    });
    const key = uuid();
    notification.success({
      key,
      message: `Updated: ${categories.getName(newCategoryId)} (${
        data.update_transactions.affected_rows
      } records)`,
      description: (
        <Button
          icon="undo"
          size="small"
          onClick={async () => {
            notification.close(key);
            const results = await Promise.all(
              currentCategoryIds.map(async (categoryId, index) => {
                const { data } = await updateTransaction({
                  variables: {
                    transactionIds: [transactionIds[index]],
                    categoryId,
                  },
                  refetchQueries: ['GetTransactions'],
                });
                return data.update_transactions.affected_rows;
              })
            );
            const recordsUpdated = results.reduce((acc, val) => acc + val, 0);
            notification.success({
              key: uuid(),
              message: `Undid: ${recordsUpdated} records`,
              placement: 'topLeft',
            });
          }}
        >
          Undo
        </Button>
      ),
      placement: 'topLeft',
    });
  };

  return (
    <>
      <Drawer
        placement="top"
        closable={false}
        visible={!!selectedRows.length}
        mask={false}
        height={80}
      >
        <Select
          placeholder="Select category"
          onChange={categoryId => {
            updateTransactionsCategory({
              transactionIds: selectedRows.map(x => x.key),
              newCategoryId: categoryId,
              currentCategoryIds: selectedRows.map(x => x.categoryId),
            });
            setSelectedRows([]);
          }}
          showSearch
          optionFilterProp="label"
        >
          {categories.get().map(({ id, name, isSub }) => (
            <Option key={id} value={id} label={name}>
              {isSub ? name : <Parent>{name}</Parent>}
            </Option>
          ))}
        </Select>
      </Drawer>
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
      <>
        <span>{count} records</span>
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
            render={date => <TimeAgo date={date} />}
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
                  {avatars[to]}
                  {from && (
                    <>
                      {' '}
                      {arrow} {avatars[from]}
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
            onFilter={(value, record) => record.category === value}
            render={(currentCategoryName, record) => {
              const categoryId = categories.getId(currentCategoryName);
              return (
                <>
                  <Select
                    value={categoryId}
                    onChange={async newCategoryId => {
                      await updateTransactionsCategory({
                        transactionIds: [record.key],
                        newCategoryId,
                        currentCategoryIds: [categoryId],
                      });
                    }}
                    showSearch
                    optionFilterProp="label"
                    size="small"
                  >
                    {categories.get().map(({ id, name, isSub }) => (
                      <Option key={id} value={id} label={name}>
                        {isSub ? name : <Parent>{name}</Parent>}
                      </Option>
                    ))}
                  </Select>
                  {!currentCategoryName && <Icon type="exclamation-circle" />}
                </>
              );
            }}
          />
        </Table>
      </>
    </>
  );
};

export default TransactionsView;
