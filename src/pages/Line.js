import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS_BY_DAY } from '../data/transactionsByDate';

const Wrapper = styled.div`
  height: 90%;
`;

const LineGraph = ({ variables }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS_BY_DAY, {
    variables,
  });
  if (loading || error) return null;

  const series = [
    {
      id: 'asdf',
      data: data?.data.map(({ date, sum }) => ({
        x: moment(date).format('YYYY-MM-DD'),
        y: sum,
      })),
    },
  ];

  console.log(series);

  return (
    <Wrapper>
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
        axisLeft={{
          legend: 'linear scale',
          legendOffset: 12,
        }}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 2 days',
          legend: 'time scale',
          legendOffset: -12,
        }}
        curve="stepAfter"
        pointSize={6}
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
