import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { DebounceInput } from 'react-debounce-input';
import { useQuery } from '@apollo/react-hooks';
import { Input, Table } from 'antd';
import styled from 'styled-components';

import { GET_TRANSACTIONS } from '../data/transactions';
import { toMoney } from '../lib';

const { Column } = Table;
const { Search } = Input;

const Amount = styled.span`
  display: block;
  text-align: right;
  color: ${({ positive, theme }) =>
    positive ? theme.positive : theme.neutral};
`;

const Transactions = ({ startDate, endDate }) => {
  const [searchText, setSearchText] = useState('');

  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      searchText: `%${searchText}%`,
    },
  });

  const transactions = data?.transactions.map(
    ({
      id,
      date,
      amount,
      accountByToAccountId,
      description,
      category,
      accountByFromAccountId,
    }) => ({
      key: id,
      date: new Date(date),
      amount: Number(amount),
      account: accountByToAccountId?.name,
      description: description,
      category: category?.name,
      fromInternalAccount: accountByFromAccountId?.name,
    })
  );

  if (error) {
    return <p>something went wrong :(</p>;
  }

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
      {!loading && (
        <>
          <span>{data?.transactions_aggregate.aggregate.count} records</span>
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
                <Amount positive={amount > 0}>{toMoney(amount)}</Amount>
              )}
            />
            <Column title="Account" dataIndex="account" key="account" />
            <Column title="From" dataIndex="from" key="from" />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Column title="Category" dataIndex="category" key="category" />
          </Table>
        </>
      )}
    </>
  );
};

export default Transactions;
