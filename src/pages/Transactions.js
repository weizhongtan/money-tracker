import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { Table, Input } from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS } from '../data/transactions';

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

  if (loading) return null;

  const transactions = data?.transactions.map(
    (
      {
        id,
        date,
        amount,
        accountByToAccountId,
        description,
        category,
        accountByFromAccountId,
      },
      index
    ) => ({
      id: id,
      index,
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
        element={Input}
        placeholder="Search..."
        value={searchText}
        onChange={event => {
          setSearchText(event.target.value);
        }}
        loading={loading}
        focus
        autoFocus
      />
      <span>{data?.transactions_aggregate.aggregate.count} records</span>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={orderBy === 'asc' ? 'ascending' : 'descending'}
              onClick={() => setOrderBy(orderBy === 'asc' ? 'desc' : 'asc')}
            >
              Date
            </Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Account</Table.HeaderCell>
            <Table.HeaderCell>From</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.map(t => (
            <Table.Row key={t.id}>
              <Table.Cell>
                <TimeAgo date={t.date} />
              </Table.Cell>
              <Table.Cell positive={t.amount > 0} negative={t.amount < 0}>
                {t.amount}
              </Table.Cell>
              <Table.Cell>{t.account}</Table.Cell>
              <Table.Cell>{t.fromInternalAccount}</Table.Cell>
              <Table.Cell>{t.description}</Table.Cell>
              <Table.Cell>{t.category}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Transactions;
