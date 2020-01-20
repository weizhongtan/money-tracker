import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { Table, Input, Loader } from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';

import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS } from '../data/transactions';

const List = ({ searchText, setLoading }) => {
  const [orderBy, setOrderBy] = useState('DATE_DESC');
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      searchText,
      orderBy,
    },
  });
  setLoading(loading);

  if (error) {
    return <p>something went wrong :(</p>;
  }

  if (loading) {
    return null;
  }

  const transactions = data.allTransactions.nodes.map(
    (
      {
        id,
        date,
        amount,
        accountByToAccountId,
        description,
        categoryByCategoryId,
        accountByFromAccountId,
      },
      index
    ) => ({
      id: id,
      index,
      date: date,
      amount: amount,
      account: accountByToAccountId?.name,
      description: description,
      category: categoryByCategoryId?.name,
      fromInternalAccount: accountByFromAccountId?.name,
    })
  );

  return (
    <>
      <p>{data.allTransactions.totalCount} records</p>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={orderBy === 'DATE_ASC' ? 'ascending' : 'descending'}
              onClick={() =>
                setOrderBy(orderBy === 'DATE_ASC' ? 'DATE_DESC' : 'DATE_ASC')
              }
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
              <Table.Cell
                positive={Number(t.amount) > 0}
                negative={Number(t.amount) < 0}
              >
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

const Transactions = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

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
        fluid
      />
      <List searchText={searchText} setLoading={setLoading} />
    </>
  );
};

export default Transactions;
