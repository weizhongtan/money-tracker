import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { DebounceInput } from 'react-debounce-input';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS } from '../data/transactions';
import { Input, Table } from 'antd';

const { Column } = Table;
const { Search } = Input;

const Transactions = ({ startDate, endDate }) => {
  const [searchText, setSearchText] = useState('');
  const [orderBy, setOrderBy] = useState('desc');

  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      searchText: `%${searchText}%`,
      orderBy,
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
            {/* <Table.HeaderCell
              sorted={orderBy === 'asc' ? 'ascending' : 'descending'}
              onClick={() => setOrderBy(orderBy === 'asc' ? 'desc' : 'asc')}
            > */}
            <Column title="amount" dataIndex="amount" key="amount" />
            <Column title="account" dataIndex="account" key="account" />
            <Column title="from" dataIndex="from" key="from" />
            <Column
              title="description"
              dataIndex="description"
              key="description"
            />
            <Column title="category" dataIndex="category" key="category" />
          </Table>
        </>
      )}
    </>
  );
};

export default Transactions;
