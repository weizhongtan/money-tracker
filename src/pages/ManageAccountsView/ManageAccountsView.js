import { UploadOutlined } from '@ant-design/icons';
import { Button, Table, Upload, notification } from 'antd';
import csvjson from 'csvjson';
import { parse as parseOFX } from 'ofx-js';
import React from 'react';

import { AccountAvatar, Amount } from '../../components';
import { toMoney, useBaseData } from '../../lib';
import { useCreateTransaction } from './data';

const { Column } = Table;

const picked = [];
const recursivePickBy = (key, val) => {
  if (key === 'STMTTRN') {
    picked.push(val);
  } else if (Array.isArray(val)) {
    val.forEach((o) => recursivePickBy(null, o));
  } else if (val && typeof val === 'object' && val.constructor === Object) {
    Object.entries(val).forEach(([_key, _val]) => {
      recursivePickBy(_key, _val);
    });
  }
};

async function ofxParser(data) {
  const raw = await parseOFX(data);
  recursivePickBy(null, raw);
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

function csvParser(data) {
  const raw = csvjson.toObject(data, {
    delimiter: ';',
    wrap: false,
  });
  return raw;
}

function qifParser(data) {
  console.log(data);
}

const parsers = {
  ofx: ofxParser,
  qfx: ofxParser,
  csv: csvParser,
  qif: qifParser,
};

const ManageAccountsView = ({ startDate, endDate }) => {
  const baseData = useBaseData();
  const [createTransaction] = useCreateTransaction();

  return (
    <>
      <Upload
        showUploadList={false}
        customRequest={async ({ file, onSuccess }) => {
          const accountId = '8d296146-8d6a-4dbc-b2ec-8dd772bf3654';

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

          onSuccess();

          notification.success({
            message: 'Import complete',
            description: (
              <>
                <p>Created {created} records</p>
                <p>Skipped {skipped} records</p>
              </>
            ),
            placement: 'topLeft',
          });
        }}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Table dataSource={baseData.accounts} size="small">
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
        <Column title="Colour" dataIndex="colour" key="colour" />
        <Column title="ID" dataIndex="id" key="id" />
      </Table>
    </>
  );
};

export default ManageAccountsView;
