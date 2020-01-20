import React from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTIONS } from '../data/transactions';

const Graphs = () => {
  const cumulative = [];
  let total = 0;
  const series = [
    {
      id: 'series1',
      data: cumulative,
    },
  ];
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  const filtered = data.ope
    .filter(t => t.account === '1')
    .map((t, index, array) => {
      return {
        date: new Date(Number(t.date)),
        amount: Number(t.amount),
        id: t.id,
      };
    });
  filtered.forEach(t => {
    total += t.amount;
    cumulative.push({ x: t.date, y: total });
  });
  return (
    <div
      style={{
        overflow: 'auto',
        width: '90%',
        height: '90%',
      }}
    >
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
    </div>
  );
};

export default Graphs;
