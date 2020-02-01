import { useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import React, { useState } from 'react';

import { Select, Wrapper } from '../components';
import { GET_CATEGORIES } from '../data/categories';
import { toMoney, toPercent } from '../lib';

const { Option } = Select;

const Pie = ({ data, total }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
    pixelRatio={2}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: 'paired' }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
    radialLabelsSkipAngle={5}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    sliceLabel={({ value }) =>
      `${toMoney(value)} (${toPercent(value / total)})`
    }
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor={{ from: 'color' }}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        itemWidth: 60,
        itemHeight: 16,
        itemsSpacing: 2,
        symbolSize: 14,
        symbolShape: 'circle',
      },
    ]}
  />
);

const Bar = ({ data, total }) => (
  <ResponsiveBar
    data={data}
    indexBy="name"
    margin={{ top: 50, right: 60, bottom: 50, left: 200 }}
    minValue="auto"
    maxValue="auto"
    layout="horizontal"
    colors={{ scheme: 'paired' }}
    colorBy="index"
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: toMoney,
    }}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: toMoney,
    }}
    enableGridX={true}
    enableGridY={false}
    labelFormat={x => `${toMoney(x)} (${toPercent(x / total)})`}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
    isInteractive={true}
  />
);

const BreakdownView = ({ startDate, endDate }) => {
  const [graph, setGraph] = useState('pie');
  const [grouping, setGrouping] = useState('category');
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: {
      startDate,
      endDate,
      categoryType: 'expense',
      groupByParent: grouping === 'category',
    },
  });
  if (loading && typeof data === 'undefined') return null;
  if (error) return 'error';

  const out = data.categories
    .map(category => ({
      id: category.name,
      name: category.name,
      label: category.name,
      value: Math.abs(category.sum),
    }))
    .sort((a, b) => b.value - a.value);

  const total = data.amount.aggregate.sum.sum;

  const Graph = graph === 'pie' ? Pie : Bar;

  return (
    <Wrapper>
      <Select defaultValue={graph} onChange={setGraph}>
        <Option value="pie">Pie</Option>
        <Option value="bar">Bar</Option>
      </Select>
      <Select defaultValue={grouping} onChange={setGrouping}>
        <Option value="subcategory">Subcategory</Option>
        <Option value="category">Category</Option>
      </Select>
      <Graph data={out} total={total} />
    </Wrapper>
  );
};

export default BreakdownView;
