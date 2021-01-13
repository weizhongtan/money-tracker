import { UploadOutlined } from '@ant-design/icons';
import { Button, Table, Upload, notification } from 'antd';
import { TableProps } from 'antd/lib/table';
import csvjson from 'csvjson';
import { parse as parseOFX } from 'ofx-js';
import React from 'react';

import { AccountAvatar, Amount, DateDisplay } from '../../components';
import { toMoney, useBaseData } from '../../lib';
import { Account } from '../../types';
import { useCreateTransaction } from './data';

const { Column } = Table;

interface StatementTransaction {
  DTPOSTED: string;
  TRNAMT: string;
  NAME: string;
}

interface Transaction {
  date: string;
  amount: number;
  description: string;
}

const picked: StatementTransaction[] = [];
function recursivePickBy(val: object, key?: string) {
  if (key === 'STMTTRN') {
    picked.push(val as StatementTransaction);
  } else if (Array.isArray(val)) {
    val.forEach((o) => recursivePickBy(o));
  } else if (val && typeof val === 'object' && val.constructor === Object) {
    Object.entries(val).forEach(([_key, _val]) => {
      recursivePickBy(_val, _key);
    });
  }
}

async function ofxParser(data: string) {
  const raw = await parseOFX(data);
  recursivePickBy(raw);
  console.log({ raw });
  return picked.flat().map((rawTransaction, index) => {
    const rawDate = rawTransaction.DTPOSTED;
    return {
      date: new Date(
        [rawDate.slice(0, 4), rawDate.slice(4, 6), rawDate.slice(6, 8)].join(
          '-'
        )
      ).toISOString(),
      amount: Number(rawTransaction.TRNAMT),
      description: rawTransaction.NAME,
    };
  });
}

function csvParser(data: string) {
  const raw = csvjson.toObject(data, {
    delimiter: ';',
    wrap: false,
  });
  return raw as Transaction[];
}

function qifParser() {
  console.log('qif is not supported');
  return [];
}

type Parser = (data: string) => Transaction[] | Promise<Transaction[]>;

const parsers: { [index: string]: Parser } = {
  ofx: ofxParser,
  qfx: ofxParser,
  csv: csvParser,
  qif: qifParser,
};

const AccountsTable: React.FC<TableProps<Account>> = (props) => {
  const [createTransaction] = useCreateTransaction();

  return (
    <Table
      size="small"
      rowClassName={(record) => {
        if (record.sum === 0) {
          return 'inactive';
        }
        return '';
      }}
      {...props}
    >
      <Column
        title="Name"
        key="name"
        render={({ name, colour }) => (
          <>
            <AccountAvatar name={name} colour={colour} /> {name}
          </>
        )}
      />
      <Column
        title="Initial Amount"
        dataIndex="initialAmount"
        key="initialAmount"
        render={(amount) => (
          <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
        )}
        align="right"
      />
      <Column
        title="Sum"
        dataIndex="sum"
        key="sum"
        render={(amount) => (
          <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
        )}
        align="right"
      />
      <Column
        title="Most Recent Transaction"
        dataIndex="mostRecentTransactionDate"
        key="mostRecentTransactionDate"
        render={(date) => <DateDisplay date={date} asTimeAgo />}
      />
      <Column title="Colour" dataIndex="colour" key="colour" />
      <Column
        title="Actions"
        dataIndex="id"
        key="id"
        render={(accountId) => (
          <Upload
            showUploadList={false}
            customRequest={async ({ file }) => {
              const rawData = await file.text();

              const sections = file.name.split('.');
              const ext = sections[sections.length - 1];

              const parser = parsers[ext];

              const data = await parser(rawData);
              if (!data || !data.length) {
                throw new Error('parser return nothing!');
              }

              const parsedJson = data.map((t) => ({
                ...t,
                accountId,
              }));

              console.log('parsedJson');
              console.log(parsedJson);

              const proms = parsedJson.map((t) => {
                return createTransaction(t);
              });
              const results = await Promise.all(proms);

              const created = results.filter((x) => x).length;
              const skipped = results.length - created;

              console.log(`Created ${created} records`);
              console.log(`Skipped ${skipped} records`);

              notification.success({
                message: 'Import complete',
                description: (
                  <span>
                    Created {created} records, skipped {skipped} records
                  </span>
                ),
                placement: 'topLeft',
              });
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Transactions</Button>
          </Upload>
        )}
      />
    </Table>
  );
};

const ManageAccountsView = () => {
  const baseData = useBaseData();

  const active: Account[] = [];
  const inactive: Account[] = [];

  // assume that accounts with no money are inactive
  baseData.accounts.forEach((account) => {
    if (account.sum === 0) {
      inactive.push(account);
    } else {
      active.push(account);
    }
  });

  return (
    <>
      <AccountsTable dataSource={active} title={() => 'Active accounts'} />
      <AccountsTable dataSource={inactive} title={() => 'Inactive accounts'} />
    </>
  );
};

export default ManageAccountsView;
