import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import React, { useState } from 'react';

import { Radio, Wrapper } from '../../components';
import { toMoney, toPercent } from '../../lib';
import { useCategories } from './data';

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
  const { loading, error, categories, total } = useCategories({
    startDate,
    endDate,
    grouping,
  });
  if (loading && typeof categories === 'undefined') return null;
  if (error) return 'error';

  const Graph = graph === 'pie' ? Pie : Bar;

  return (
    <Wrapper>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={graph}
        onChange={event => setGraph(event.target.value)}
      >
        <Radio.Button value="pie">Pie</Radio.Button>
        <Radio.Button value="bar">Bar</Radio.Button>
      </Radio.Group>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={grouping}
        onChange={event => setGrouping(event.target.value)}
      >
        <Radio.Button value="subcategory">Subcategory</Radio.Button>
        <Radio.Button value="category">Category</Radio.Button>
      </Radio.Group>
      <Graph data={categories} total={total} />
    </Wrapper>
  );
};

export default BreakdownView;
