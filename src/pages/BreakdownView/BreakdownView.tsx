import { ResponsiveBar } from '@nivo/bar';
import { PieDatum, ResponsivePie } from '@nivo/pie';
import React, { useState } from 'react';

import { PageDrawer, Radio, Select, Wrapper } from '../../components';
import { toMoney, toPercent } from '../../lib';
import { TimePeriod } from '../../types';
import TransactionsView from '../TransactionsView';
import { useCategories } from './data';

const { Option } = Select;

type GraphProps = {
  data: PieDatum[];
  total: number;
  onClick: (categoryId: string) => void;
};

const Pie: React.FC<GraphProps> = ({ data, total, onClick, ...props }) => (
  <ResponsivePie
    data={data}
    onClick={(data) => onClick(data._id as string)}
    margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
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
    {...props}
  />
);

const Bar: React.FC<GraphProps> = ({ data, total, onClick, ...props }) => (
  <ResponsiveBar
    data={data}
    onClick={({ data }) => onClick(data._id as string)}
    indexBy="name"
    margin={{ top: 50, right: 60, bottom: 50, left: 200 }}
    minValue="auto"
    maxValue="auto"
    layout="horizontal"
    colors={{ scheme: 'paired' }}
    // colorBy="index"
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: (label) => toMoney(label),
    }}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: (label) => toMoney(label),
    }}
    enableGridX={true}
    enableGridY={false}
    labelFormat={(x) => `${toMoney(x)} (${toPercent(Number(x) / total)})`}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
    isInteractive={true}
    {...props}
  />
);

type BreakdownViewProps = TimePeriod;

const BreakdownView: React.FC<BreakdownViewProps> = ({
  startDate,
  endDate,
}) => {
  const [accountId, setAccountId] = useState('all');
  const [graph, setGraph] = useState('pie');
  const [grouping, setGrouping] = useState('category');
  const [isVisible, setVisible] = useState(false);
  const [transactionViewCategoryId, setTransactionViewCategoryId] = useState<
    string
  >();
  const { loading, error, accounts, categories, total } = useCategories({
    startDate,
    endDate,
    accountId,
    grouping,
  });
  if (loading || typeof categories === 'undefined') return null;
  if (error) return <>error</>;

  const Graph = graph === 'pie' ? Pie : Bar;

  return (
    <Wrapper>
      <PageDrawer visible={isVisible} onClose={() => setVisible(false)}>
        <TransactionsView
          startDate={startDate}
          endDate={endDate}
          categoryId={transactionViewCategoryId}
          accountId={accountId === 'all' ? undefined : accountId}
        />
      </PageDrawer>
      <Select
        value={accountId}
        onSelect={(val) => typeof val === 'string' && setAccountId(val)}
        showSearch
        optionFilterProp="label"
      >
        {accounts.map(({ id, name }) => (
          <Option value={id as string} key={id as string} label={name}>
            {name}
          </Option>
        ))}
      </Select>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={graph}
        onChange={(event) => setGraph(event.target.value)}
      >
        <Radio.Button value="pie">Pie</Radio.Button>
        <Radio.Button value="bar">Bar</Radio.Button>
      </Radio.Group>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={grouping}
        onChange={(event) => setGrouping(event.target.value)}
      >
        <Radio.Button value="subcategory">Subcategory</Radio.Button>
        <Radio.Button value="category">Category</Radio.Button>
      </Radio.Group>
      {total && <span>Total: {toMoney(total)}</span>}
      <Graph
        data={categories}
        total={total ?? 0}
        onClick={(id) => {
          setTransactionViewCategoryId(id);
          setVisible(true);
        }}
      />
    </Wrapper>
  );
};

export default BreakdownView;
