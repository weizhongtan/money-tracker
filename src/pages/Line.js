import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { Dropdown } from 'semantic-ui-react';
import { GET_TRANSACTIONS_BY_DAY } from '../data/transactionsByDate';

const Wrapper = styled.div`
  height: 90%;
`;

const getTickValues = numOfValues => {
  if (numOfValues <= 7) {
    return 'every day';
  }
  if (numOfValues <= 31) {
    return 'every 2 days';
  }
  if (numOfValues <= 62) {
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

  const options = data?.accounts.map(({ id, name }) => ({
    key: id,
    value: id,
    text: name,
  }));

  console.log(options);

  const series = [
    {
      id: 'asdf',
      data: data?.cumulative_transactions.map(({ date, sum }) => ({
        x: moment(date).format('YYYY-MM-DD'),
        y: sum,
      })),
    },
  ];

  console.log(series);

  return (
    <Wrapper>
      <Dropdown
        inline
        selection
        options={options}
        value={accountId}
        onChange={(_, { value }) => setAccountId(value)}
      />
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
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
          min: 'auto',
        }}
        axisBottom={{
          format: '%b %d',
          tickValues: getTickValues(series[0].data.length),
        }}
        curve="stepAfter"
        pointSize={7}
        pointBorderWidth={1}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
      />
    </Wrapper>
  );
};

export default LineGraph;
