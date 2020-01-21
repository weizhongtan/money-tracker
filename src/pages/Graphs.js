import React from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 90%;
`;

const Graphs = ({ transactions }) => {
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
    cumulative.push({ x: t.date, y: total });
  });

  return (
    <Wrapper>
      <ResponsiveLineCanvas
        margin={{ top: 30, right: 50, bottom: 100, left: 100 }}
        xScale={{ type: 'time', format: 'native' }}
        yScale={{ type: 'linear', min: -2000 }}
        axisBottom={{
          format: '%m/%d/%Y',
          tickValues: 'every 3 months',
        }}
        data={series}
        isInteractive={false}
        theme={{
          axis: { ticks: { text: { fontSize: 14 } } },
          grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
        }}
      />
    </Wrapper>
  );
};

export default Graphs;
