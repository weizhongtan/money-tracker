import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { Select } from 'antd';
import { GET_TRANSACTIONS_GROUP_BY } from '../data/transactionsGroupBy';
import { toMoney } from '../lib';

const { Option } = Select;

const Wrapper = styled.div`
  height: 100%;
`;

const AccountSelect = styled(Select)`
  width: 300px;
`;
const PrecisionSelect = styled(Select)`
  width: 300px;
`;

const getTickValues = (startDate, endDate) => {
  const duration = endDate.diff(startDate, 'days');
  if (duration <= 7) {
    return 'every day';
  }
  if (duration <= 31) {
    return 'every 2 days';
  }
  if (duration <= 62) {
    return 'every 1 week';
  }
  return 'every 1 month';
};

const Cumulative = ({ startDate, endDate }) => {
  // TODO: fix this
  // default nationwide account id for now
  const [accountId, setAccountId] = useState(null);
  const [precision, setPrecision] = useState('day');
  const { loading, error, data } = useQuery(GET_TRANSACTIONS_GROUP_BY, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      accountId,
      groupBy: precision,
    },
  });
  if (loading || error) return null;

  const series = [
    {
      id: '£',
      data: data?.cumulative_transactions.map(({ date, sum }) => ({
        x: moment(date).format('YYYY-MM-DD'),
        y: toMoney(sum),
      })),
    },
  ];

  const tickValues = getTickValues(startDate, endDate);

  const accounts = [
    {
      id: null,
      name: 'All Accounts',
    },
    ...data?.accounts,
  ];

  return (
    <Wrapper>
      <AccountSelect defaultValue={accountId} onChange={setAccountId}>
        {accounts.map(({ id, name }) => (
          <Option value={id} key={id}>
            {name}
          </Option>
        ))}
      </AccountSelect>
      <PrecisionSelect defaultValue={precision} onChange={setPrecision}>
        <Option value="day">Day</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
      </PrecisionSelect>
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 100, left: 80 }}
        animate
        data={series}
        enableArea
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          min: Math.min(...series[0].data.map(({ y }) => y)) > 0 ? 0 : 'auto',
          max: Math.max(...series[0].data.map(({ y }) => y)) < 0 ? 0 : 'auto',
        }}
        axisLeft={{
          format: value => `£${value}`,
        }}
        axisBottom={{
          format: '%b %d',
          tickValues,
        }}
        curve="stepAfter"
        pointSize={7}
        pointBorderWidth={1}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        enableSlices="x"
      />
    </Wrapper>
  );
};

export default Cumulative;