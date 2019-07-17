import React, { useState } from 'react';
import { LineChart, LineSeries } from 'reaviz';

import data from './private/data';
import { Table, Input } from 'semantic-ui-react';

const filtered = data.ope
  .filter(t => t.account === '1')
  .map((t, index, array) => {
    return {
      date: new Date(Number(t.date)),
      amount: Number(t.amount),
      id: t.id,
    };
  });

const cumulative = [];
let total = 0;

filtered.forEach(t => {
  const key = t.date;
  total += t.amount;
  const data = total;
  cumulative.push({ key, data, id: t.id });
});

console.log(cumulative);

const Graphs = () => {
  return (
    <LineChart
      width={350}
      height={250}
      data={cumulative}
      series={<LineSeries />}
    />
  );
};

export default Graphs;
