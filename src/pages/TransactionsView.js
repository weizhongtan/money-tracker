import { useMutation, useQuery } from '@apollo/react-hooks';
import { Input, Table } from 'antd';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import { Select } from '../components';
import { QUERY } from '../data/transactions';
import { QUERY as UPDATE_QUERY } from '../data/updateTransaction';
import { toMoney } from '../lib';

const { Option } = Select;
const { Column } = Table;
const { Search } = Input;

const Amount = styled.span`
  display: block;
  text-align: right;
  color: ${({ positive, theme }) =>
    positive ? theme.positive : theme.neutral};
`;

const TransactionsView = ({ startDate, endDate }) => {
  const [searchText, setSearchText] = useState('');
  const [updateTransaction] = useMutation(UPDATE_QUERY);
  const updateTransactionCategory = ({ transactionId, categoryId }) => {
    updateTransaction({
      variables: {
        transactionId,
        categoryId,
      },
    });
  };

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      searchText: `%${searchText}%`,
    },
  });
  if (loading && typeof data === 'undefined') return null;
  if (error) return 'error';

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
          category: category?.name,
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
            filters={data.categories.map(({ name }) => ({
              text: name,
              value: name,
            }))}
            onFilter={(value, record) => record.category === value}
            render={(categoryName, record) => (
              <>
                <Select
                  defaultValue={categoryName}
                  onChange={categoryId =>
                    updateTransactionCategory({
                      transactionId: record.id,
                      categoryId,
                    })
                  }
                  showSearch
                  optionFilterProp="children"
                >
                  {data.categories.map(({ id, name }) => (
                    <Option value={id} key={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </>
            )}
          />
        </Table>
      </>
    </>
  );
};

export default TransactionsView;
