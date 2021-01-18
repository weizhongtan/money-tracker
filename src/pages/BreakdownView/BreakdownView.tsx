import { Bar, BarSvgProps } from '@nivo/bar';
import { Dimensions } from '@nivo/core';
import { Pie, PieSvgProps } from '@nivo/pie';
import React, { useState } from 'react';

import { Filters } from '../../App';
import {
  PageDrawer,
  Radio,
  Visualisation,
  VisualisationControls,
} from '../../components';
import { toMoney, toPercent, useIsMount } from '../../lib';
import { TimePeriod } from '../../types';
import TransactionsView from '../TransactionsView';
import { useCategories } from './data';

type PieBreakdownProps = PieSvgProps &
  Dimensions & {
    total: number;
  };

const PieBreakdown: React.FC<PieBreakdownProps> = ({
  data,
  total,
  ...props
}) => (
  <Pie
    data={data}
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
    tooltip={({ label, value }) => {
      return (
        <span>
          {label} - {toMoney(value, false)}
        </span>
      );
    }}
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

type BarBreakdownProps = BarSvgProps &
  Dimensions & {
    total: number;
  };

const BarBreakdown: React.FC<BarBreakdownProps> = ({ total, ...props }) => (
  <Bar
    indexBy="name"
    margin={{ top: 50, right: 60, bottom: 50, left: 200 }}
    minValue="auto"
    maxValue="auto"
    layout="horizontal"
    colors={{ scheme: 'paired' }}
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
    tooltip={({ indexValue, value }) => {
      return (
        <span>
          {indexValue} - {toMoney(value, false)}
        </span>
      );
    }}
    isInteractive={true}
    {...props}
  />
);

type BreakdownViewProps = TimePeriod & Filters;

const BreakdownView: React.FC<BreakdownViewProps> = ({
  startDate,
  endDate,
  accountIdFilter,
}) => {
  const [graph, setGraph] = useState('pie');
  const [grouping, setGrouping] = useState('category');
  const [isVisible, setVisible] = useState(false);
  const [
    transactionViewCategoryId,
    setTransactionViewCategoryId,
  ] = useState<string>();

  // workaround to prevent the drawer showing on first render
  const isMount = useIsMount();
  React.useEffect(() => {
    if (!isMount) {
      setVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionViewCategoryId]);

  const { error, expense, income } = useCategories({
    startDate,
    endDate,
    accountId: accountIdFilter,
    grouping,
  });
  if (error) return <>error</>;

  const Graph = graph === 'pie' ? PieBreakdown : BarBreakdown;

  return (
    <>
      <VisualisationControls>
        <PageDrawer visible={isVisible} onClose={() => setVisible(false)}>
          <TransactionsView
            startDate={startDate}
            endDate={endDate}
            accountIdFilter={accountIdFilter}
            setAccountIdFilter={() => {}}
            categoryIdFilter={transactionViewCategoryId}
            setCategoryIdFilter={() => {}}
          />
        </PageDrawer>
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
        {income.total && (
          <span>Total income: {toMoney(income.total, false)}</span>
        )}
        {expense.total && (
          <span>Total expense: {toMoney(expense.total, false)}</span>
        )}
        <h2>Of total income:</h2>
      </VisualisationControls>
      <Visualisation>
        {({ height, width }) => {
          return (
            <>
              {expense.categories && (
                <>
                  <Graph
                    height={height}
                    width={width}
                    data={expense.categories}
                    total={income.total ?? 0}
                    onClick={(data: any) => {
                      setTransactionViewCategoryId(String(data._id));
                    }}
                  />
                </>
              )}
            </>
          );
        }}
      </Visualisation>
    </>
  );
};

export default BreakdownView;
