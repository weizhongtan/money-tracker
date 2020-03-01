import { Table } from 'antd';
import React from 'react';

import { Amount } from '../../components';
import { toMoney, useBaseData } from '../../lib';

const { Column } = Table;

const ManageAccountsView = ({ startDate, endDate }) => {
  const baseData = useBaseData();

  return (
    <>
      <Table dataSource={baseData.accounts} size="small">
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Initial Amount"
          dataIndex="initialAmount"
          key="initialAmount"
          render={amount => (
            <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
          )}
        />
        <Column
          title="Sum"
          dataIndex="sum"
          key="sum"
          render={amount => (
            <Amount positive={amount > 0}>{toMoney(amount, false)}</Amount>
          )}
        />
      </Table>
    </>
  );
};

export default ManageAccountsView;
