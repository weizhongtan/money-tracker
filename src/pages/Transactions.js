import React from 'react';
import TimeAgo from 'react-timeago';
import { Table } from 'semantic-ui-react';

const Transactions = ({ transactions, orderBy, setOrderBy }) => {
  return (
    <>
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
