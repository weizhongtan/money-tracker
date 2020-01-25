import { useQuery } from '@apollo/react-hooks';
import { ResponsiveLine } from '@nivo/line';
import { Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';

import { GET_TRANSACTIONS_GROUP_BY } from '../data/transactionsGroupByCumulative';
import { toMoney } from '../lib';

const { Option } = Select;

const getBottomAxisProp = (startDate, endDate) => {
  const duration = endDate.diff(startDate, 'days');
  if (duration <= 7) {
    return {
      format: '%d %b',
      tickValues: 'every day'
    };
  }
  if (duration <= 31) {
    return {
      format: '%d %b',
      tickValues: 'every 2 days'
    };
  }
  if (duration <= 62) {
    return {
      format: '%b \'%y',
      tickValues: 'every 1 week'
    };
  }
  if (duration <= 365) {
    return {
      format: '%b \'%y',
      tickValues: 'every 1 month'
    };
  }
    return {
      format: '%b \'%y',
      tickValues: 'every 3 months'
    };
};

const Wrapper = styled.div`
  height: 100%;
`;
const AccountSelect = styled(Select)`
  width: 300px;
`;
const PrecisionSelect = styled(Select)`
  width: 300px;
`;

const CumulativeView = ({ startDate, endDate }) => {
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

  const firstDataPoint = series[0].data[0];
  if (firstDataPoint && startDate.isBefore(moment(firstDataPoint.x))) {
    series[0].data.unshift({ x: startDate.format('YYYY-MM-DD'), y: firstDataPoint.y })
  }

  const lastDataPoint = series[0].data[series[0].data.length - 1];
  if (lastDataPoint && endDate.isAfter(moment(lastDataPoint.x))) {
    series[0].data.push({ x: endDate.format('YYYY-MM-DD'), y: lastDataPoint.y })
  }

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
        // xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          min: Math.min(...series[0].data.map(({ y }) => y)) > 0 ? 0 : 'auto',
          max: Math.max(...series[0].data.map(({ y }) => y)) < 0 ? 0 : 'auto',
        }}
        axisLeft={{
          format: value => `£${value}`,
        }}
        axisBottom={getBottomAxisProp(startDate, endDate)}
        curve="stepAfter"
        pointSize={7}
        pointBorderWidth={1}
        pointBorderColor="#fff"
        enableSlices="x"
      />
    </Wrapper>
  );
};

export default CumulativeView;
