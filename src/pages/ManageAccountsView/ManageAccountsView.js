import { Table } from 'antd';
import React from 'react';

import { AccountAvatar, Amount, Button } from '../../components';
import { toMoney, useBaseData } from '../../lib';

const { Column } = Table;

const ManageAccountsView = ({ startDate, endDate }) => {
  const baseData = useBaseData();

  return (
    <>
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
          render={amount => (
            <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
          )}
          align="right"
        />
        <Column
          title="Sum"
          dataIndex="sum"
          key="sum"
          render={amount => (
            <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
          )}
          align="right"
        />
        <Column title="Colour" dataIndex="colour" key="colour" />
      </Table>
    </>
  );
};

export default ManageAccountsView;
