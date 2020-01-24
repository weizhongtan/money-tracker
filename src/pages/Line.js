import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { Select } from 'antd';
import { GET_TRANSACTIONS_BY_DAY } from '../data/transactionsByDate';
import { toMoney } from '../lib';

const { Option } = Select;

const Wrapper = styled.div`
  height: 100%;
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

const LineGraph = ({ startDate, endDate }) => {
  // TODO: fix this
  // default nationwide account id for now
  const [accountId, setAccountId] = useState(
    '3bb877cf-131e-4884-a7e4-ff11824e0cf3'
  );
  const { loading, error, data } = useQuery(GET_TRANSACTIONS_BY_DAY, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      accountId,
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

  const accounts = data?.accounts;

  return (
    <Wrapper>
      <Select
        defaultValue={accounts[0].name}
        value={accountId}
        onChange={setAccountId}
      >
        {accounts.map(({ id, name }) => (
          <Option value={id}>{name}</Option>
        ))}
      </Select>
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

export default LineGraph;
