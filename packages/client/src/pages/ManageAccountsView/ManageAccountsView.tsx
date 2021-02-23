import { ImportOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Modal,
  Radio,
  Space,
  Spin,
  Table,
  Upload,
  notification,
} from 'antd';
import { TableProps } from 'antd/lib/table';
import Paragraph from 'antd/lib/typography/Paragraph';
import csvjson from 'csvjson';
import { parse as parseOFX } from 'ofx-js';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  useExchangeCodeMutation,
  useGetAuthUrlQuery,
  useImportTransactionsMutation,
} from '../../../../common/generated/graphql-react-apollo';
import { AccountAvatar, Amount, DateDisplay } from '../../components';
import { time, useBaseData } from '../../lib';
import { Account, Nullable } from '../../types';
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

function qifParser(): Transaction[] {
  console.error('qif is not supported');
  return [];
}

type Parser = (data: string) => Transaction[] | Promise<Transaction[]>;

const parsers: { [name: string]: Parser } = {
  ofx: ofxParser,
  qfx: ofxParser,
  csv: csvParser,
  qif: qifParser,
};

const AccountsTable: React.FC<TableProps<Account>> = ({ ...props }) => {
  const [createTransaction] = useCreateTransaction();
  const { data } = useGetAuthUrlQuery();
  const authUrl = data?.getAuthUrl?.url;

  return (
    <>
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
        <Column<Account>
          title="Name"
          key="name"
          render={({ name, colour }) => (
            <>
              <AccountAvatar name={name} colour={colour} /> {name}
            </>
          )}
        />
        <Column<Account>
          title="Initial Amount"
          dataIndex="initialAmount"
          key="initialAmount"
          render={(_, { initialAmount }) => (
            <Amount value={Number(initialAmount)} />
          )}
          align="right"
        />
        <Column<Account>
          title="Sum"
          dataIndex="sum"
          key="sum"
          render={(_, record) => <Amount value={Number(record.sum)} />}
          align="right"
        />
        <Column<Account>
          title="Most Recent Transaction"
          dataIndex="mostRecentTransactionDate"
          key="mostRecentTransactionDate"
          render={(date) => <DateDisplay date={date} asTimeAgo />}
        />
        <Column<Account> title="Colour" dataIndex="colour" key="colour" />
        <Column<Account>
          title="Actions"
          dataIndex="id"
          key="id"
          render={(_, record) => (
            <Space>
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
                    accountId: record.id,
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
                <Button icon={<UploadOutlined />}>Upload transactions</Button>
              </Upload>
              <Button
                icon={<ImportOutlined />}
                href={`${authUrl}&state=${record.id}` ?? '#'}
                loading={!authUrl}
                disabled={!authUrl}
              >
                Connect to bank
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

const useTrueLayerCode = () => {
  const location = useLocation();
  const history = useHistory();
  const [exchangeCode, { data, loading }] = useExchangeCodeMutation();
  const [toAccountId, setToAccountId] = React.useState<string>();

  React.useEffect(() => {
    const search = new URLSearchParams(location.search);
    const code = search.get('code');
    const toAccountId = search.get('state');

    if (code && toAccountId) {
      setToAccountId(toAccountId);
      search.delete('code');
      search.delete('scope');
      search.delete('state');
      history.push({ search: search.toString() });
      exchangeCode({
        variables: { code },
      });
    }
  }, []);

  return [
    {
      toAccountId,
      cardIds: data?.exchangeCode?.cardIds,
      accountIds: data?.exchangeCode?.accountIds,
    },
    { loading },
  ] as const;
};

type ImportModalProps = {
  cardIds: Nullable<string[]>;
  accountIds: Nullable<string[]>;
  toAccount?: Account;
};

const ImportModal: React.FC<ImportModalProps> = ({
  cardIds,
  accountIds,
  toAccount,
}) => {
  const [importTransactions] = useImportTransactionsMutation();
  const [showModal, setShowModal] = React.useState(true);
  const [isImporting, setIsImporting] = React.useState(false);

  const initialValues: {
    fromCardId: Nullable<string>;
    fromAccountId: Nullable<string>;
  } = {
    fromCardId: null,
    fromAccountId: null,
  };

  const handleFinish = async (values: typeof initialValues) => {
    setIsImporting(true);

    const res = await importTransactions({
      variables: {
        fromCardId: values.fromCardId,
        fromAccountId: values.fromAccountId,
        toAccountId: toAccount.id,
        startDate: toAccount.mostRecentTransactionDate ?? time().toISOString(),
      },
    });

    notification.success({
      message: 'Import complete',
      description: (
        <span>
          Created {res.data?.importTransactions.created} records, skipped{' '}
          {res.data?.importTransactions.skipped} records
        </span>
      ),
      placement: 'topLeft',
    });
    setIsImporting(false);
    setShowModal(false);
  };

  return (
    <>
      <Modal
        title="Select which account to import from"
        visible={(!!cardIds || !!accountIds) && showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {toAccount && (
          <Paragraph>
            Importing into{' '}
            <AccountAvatar name={toAccount.name} colour={toAccount.colour} />{' '}
            {toAccount.name}
          </Paragraph>
        )}
        <Form
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleFinish}
        >
          {cardIds && (
            <Form.Item
              label="From card"
              name="fromCardId"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                {cardIds.map((id) => {
                  return (
                    <Radio value={id} key={id}>
                      {id}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          )}
          {accountIds && (
            <Form.Item
              label="From account"
              name="fromAccountId"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                {accountIds.map((id) => {
                  return (
                    <Radio value={id} key={id}>
                      {id}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isImporting}>
              Import
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const ManageAccountsView = () => {
  const baseData = useBaseData();
  const [
    { cardIds, accountIds, toAccountId },
    { loading },
  ] = useTrueLayerCode();

  const toAccount = baseData.accounts.find((a) => a.id === toAccountId);
  const active = baseData.accounts.filter((x) => x.status === 'active');
  const inactive = baseData.accounts.filter((x) => x.status === 'inactive');

  return (
    <>
      <Spin spinning={loading}>
        <ImportModal
          cardIds={cardIds}
          accountIds={accountIds}
          toAccount={toAccount}
        />
        <AccountsTable dataSource={active} title={() => 'Active accounts'} />
        <AccountsTable
          dataSource={inactive}
          title={() => 'Inactive accounts'}
        />
      </Spin>
    </>
  );
};

export default ManageAccountsView;
