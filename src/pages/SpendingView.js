import React, { useState } from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';
import { ResponsiveBarCanvas } from '@nivo/bar';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from '../data/categories';
import { toMoney } from '../lib';
import { Select } from 'antd';

const { Option } = Select;

const Pie = ({ data }) => (
  <ResponsivePieCanvas
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
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
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

const Bar = ({ data }) => (
  <ResponsiveBarCanvas
    data={data}
    indexBy="name"
    margin={{ top: 50, right: 60, bottom: 50, left: 200 }}
    pixelRatio={2}
    padding={0.15}
    innerPadding={0}
    minValue="auto"
    maxValue="auto"
    layout="horizontal"
    reverse={false}
    colors={{ scheme: 'paired' }}
    colorBy="index"
    borderWidth={0}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: value => `£${value}`,
    }}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: value => `£${value}`,
    }}
    enableGridX={true}
    enableGridY={false}
    enableLabel={true}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    isInteractive={true}
  />
);

const Wrapper = styled.div`
  height: 90%;
`;

const CategoryView = ({ startDate, endDate }) => {
  const [graph, setGraph] = useState('pie');
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { startDate, endDate },
  });
  if (loading || error) return null;

  const out = data.categories
    .map(category => ({
      id: category.name,
      name: category.name,
      label: category.name,
      value: toMoney(
        Math.abs(category.transactions_aggregate.aggregate.sum.amount) ?? 0
      ),
    }))
    .sort((a, b) => b.value - a.value)
    .filter(x => x.value > 0);

  return (
    <Wrapper>
      <Select defaultValue={graph} onChange={setGraph}>
        <Option value="pie">Pie</Option>
        <Option value="bar">Bar</Option>
      </Select>
      {graph === 'pie' ? <Pie data={out} /> : <Bar data={out} />}
    </Wrapper>
  );
};

export default CategoryView;
