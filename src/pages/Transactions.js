import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { Table, Input, Loader } from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';

import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS } from '../data/transactions';

const List = ({ accountName }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      accountName,
    },
  });

  if (error) {
    return <p>something went wrong :(</p>;
  }

  if (loading) {
    return <Loader active inline />;
  }

  const transactions = data?.allTransactions.nodes.map(
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

  const headings = [
    'index',
    'date',
    'amount',
    'account',
    'fromInternalAccount',
    'description',
    'category',
  ];

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {headings.map(heading => {
            return <Table.HeaderCell key={heading}>{heading}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {transactions.map(transaction => (
          <Table.Row key={transaction.id}>
            {headings.map(heading => {
              if (heading === 'date') {
                return (
                  <Table.Cell key={heading}>
                    <TimeAgo date={transaction.date} />
                  </Table.Cell>
                );
              }
              return (
                <Table.Cell key={heading}>{transaction[heading]}</Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const Transactions = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        placeholder="Search..."
        value={searchText}
        onChange={event => {
          setSearchText(event.target.value);
        }}
        element={Input}
      />
      <List accountName={searchText} />
    </>
  );
};

export default Transactions;
