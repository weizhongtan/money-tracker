import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ButtonSelect, Select } from '../../components';
import { CategoriesList, toMoney, useBaseData } from '../../lib';
import { useUpdateCategory } from './data';

const { Option } = Select;
const { Column } = Table;

const ManageAccountsView = ({ startDate, endDate }) => {
  const baseData = useBaseData();

  console.log(baseData.accounts);

  return (
    <>
      <Table dataSource={baseData.accounts} size="small">
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Initial Amount"
          dataIndex="initialAmount"
          key="initialAmount"
          render={amount => toMoney(amount, false)}
        />
        <Column
          title="Sum"
          dataIndex="sum"
          key="sum"
          render={amount => toMoney(amount, false)}
        />
      </Table>
    </>
  );
};

export default ManageAccountsView;
