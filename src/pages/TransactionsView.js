import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Input, Table, notification } from 'antd';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { Select } from '../components';
import { CategoriesList, toMoney } from '../lib';

const { Option } = Select;
const { Column } = Table;
const { Search } = Input;

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $startDate: timestamptz
    $endDate: timestamptz
    $searchText: String
  ) {
    accounts(order_by: { legacy_key: asc }) {
      id
      name
    }
    categories: view_categories_with_parents(order_by: { full_name: asc }) {
      id
      name: full_name
    }
    transactions_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        description: { _ilike: $searchText }
      }
      order_by: { date: desc }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        date
        amount
        description
        accountByFromAccountId {
          name
        }
        accountByToAccountId {
          name
        }
        category {
          id
          name
        }
        pair_id
      }
    }
  }
`;

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($transactionId: uuid, $categoryId: uuid) {
    update_transactions(
      where: { id: { _eq: $transactionId } }
      _set: { category_id: $categoryId }
    ) {
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

const WithState = ({ initialValue, children }) => {
  const [value, setValue] = useState(initialValue);
  return children({ value, setValue });
};

const TransactionsView = ({ startDate, endDate }) => {
  const [searchText, setSearchText] = useState('');
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      searchText: `%${searchText}%`,
    },
  });
  if (loading && typeof data === 'undefined') return null;
  if (error) return 'error';

  const categories = new CategoriesList(data.categories);

  const updateTransactionCategory = async ({
    transactionId,
    newCategoryId,
    currentCategoryId,
    setValue,
  }) => {
    await updateTransaction({
      variables: {
        transactionId,
        categoryId: newCategoryId,
      },
    });
    const key = uuid();
    notification.success({
      key,
      message: `Updated: ${categories.getName(newCategoryId)}`,
      description: (
        <Button
          icon="undo"
          size="small"
          onClick={async () => {
            notification.close(key);
            await updateTransaction({
              variables: {
                transactionId,
                categoryId: currentCategoryId,
              },
            });
            setValue(currentCategoryId);
          }}
        >
          Undo
        </Button>
      ),
      placement: 'topLeft',
    });
  };

  const transactions = data?.transactions_aggregate.nodes
    .map(
      ({
        id,
        date,
        amount,
        accountByToAccountId,
        description,
        category,
        accountByFromAccountId,
      }) => {
        return {
          key: id,
          id,
          date: new Date(date),
          amount: Number(amount),
          account: accountByToAccountId?.name,
          from: accountByFromAccountId?.name,
          description: description,
          category: categories.getName(category?.id),
        };
      }
    )
    .flat();

  return (
    <>
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
        <span>{data.transactions_aggregate.aggregate.count} records</span>
        <Table
          dataSource={transactions}
          pagination={{
            defaultPageSize: 50,
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
            title="Amount"
            dataIndex="amount"
            key="amount"
            render={amount => (
              <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
            )}
          />
          <Column
            title="Account"
            dataIndex="account"
            key="account"
            filters={data.accounts.map(({ name }) => ({
              text: name,
              value: name,
            }))}
            onFilter={(value, record) => record.account === value}
          />
          <Column title="From" dataIndex="from" key="from" />
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
            render={(currentCategoryName, record) => (
              <WithState initialValue={categories.getId(currentCategoryName)}>
                {({ value, setValue }) => (
                  <Select
                    value={value}
                    onChange={async newCategoryId => {
                      setValue(newCategoryId);
                      await updateTransactionCategory({
                        transactionId: record.id,
                        newCategoryId,
                        currentCategoryId: value,
                        setValue,
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
                )}
              </WithState>
            )}
          />
        </Table>
      </>
    </>
  );
};

export default TransactionsView;
