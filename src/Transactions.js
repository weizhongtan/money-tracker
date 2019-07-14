import React, { useState } from 'react';
import TimeAgo from 'react-timeago';

import data from './private/data';
import { Table, Input } from 'semantic-ui-react';

const headings = [
  'no',
  'date',
  'amount',
  'account',
  'fromInternalAccount',
  'paymode',
  'st',
  'category',
  'wording',
  'kxfer',
];

const getByKey = thing => key => {
  const s = data[thing].find(t => t.key === key);
  if (s) {
    return s.name;
  }
  return null;
};

const getAccountByKey = getByKey('account');
const getCategoryByKey = getByKey('cat');

const mappedData = data.ope.map((transaction, index) => ({
  ...transaction,
  no: index,
  date: new Date(Number(transaction.date)).toISOString(),
  amount: Number.parseFloat(transaction.amount).toFixed(2),
  account: getAccountByKey(transaction.account),
  category: getCategoryByKey(transaction.category),
  fromInternalAccount: getAccountByKey(transaction.dst_account),
}));

const Transactions = () => {
  const [transactions, setTransactions] = useState(mappedData);
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e, { value }) => {
          setSearchText(value);
          setTransactions(
            value
              ? mappedData.filter(t => {
                  return t.wording.match(new RegExp(value, 'gi'));
                })
              : mappedData
          );
        }}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            {headings.map(heading => {
              return (
                <Table.HeaderCell key={heading}>{heading}</Table.HeaderCell>
              );
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
    </>
  );
};

export default Transactions;
