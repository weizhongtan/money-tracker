import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  height: 90%;
`;

const LineGraph = ({ transactions }) => {
  // TODO: move aggregation into postgres
  const cumulative = [];
  let total = 0;
  const series = [
    {
      id: 'series1',
      data: cumulative,
    },
  ];
  transactions.forEach(t => {
    total += t.amount;
    cumulative.push({ x: moment(t.date).format('YYYY-MM-DD'), y: total });
  });

  console.log(series);

  return (
    <Wrapper>
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        animate
        data={series}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
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
        pointSize={4}
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
