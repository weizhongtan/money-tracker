import { Bar, BarSvgProps } from '@nivo/bar';
import { Dimensions } from '@nivo/core';
import { Pie, PieSvgProps } from '@nivo/pie';
import { Checkbox } from 'antd';
import React, { useState } from 'react';

import { Filters } from '../../App';
import {
  PageDrawer,
  Radio,
  Visualisation,
  VisualisationControls,
} from '../../components';
import { toLabelledValue, toMoney, toPercent } from '../../lib';
import { Category, TimePeriod } from '../../types';
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
    radialLabelsSkipAngle={4}
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
      return <span>{toLabelledValue(label, toMoney(value, false))}</span>;
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
      return <span>{toLabelledValue(indexValue, toMoney(value, false))}</span>;
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
  showControls,
}) => {
  const [graph, setGraph] = useState<'pie' | 'bar'>('pie');
  const [grouping, setGrouping] = useState(true);
  const [fractionOfIncome, setFractionOfIncome] = useState(true);
  const [drawerState, setDrawerState] = useState<{
    isVisible: boolean;
    categoryId?: Category['id'];
  }>({
    isVisible: false,
  });

  const { error, expense, income } = useCategories({
    startDate,
    endDate,
    groupCategories: grouping,
    accountId: accountIdFilter,
    fractionOfIncome,
  });
  if (error) return <>error</>;

  const Graph = graph === 'pie' ? PieBreakdown : BarBreakdown;

  return (
    <>
      <VisualisationControls show={showControls}>
        <PageDrawer
          visible={drawerState.isVisible}
          onClose={() =>
            setDrawerState({
              ...drawerState,
              isVisible: false,
            })
          }
        >
          <TransactionsView
            startDate={startDate}
            endDate={endDate}
            accountIdFilter={accountIdFilter}
            categoryIdFilter={drawerState.categoryId}
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
        <Checkbox
          checked={grouping}
          onChange={(event) => {
            setGrouping(event.target.checked);
          }}
        >
          Group categories
        </Checkbox>
        <Checkbox
          checked={fractionOfIncome}
          onChange={(event) => {
            setFractionOfIncome(event.target.checked);
          }}
        >
          Show as percentage of income
        </Checkbox>
        {income.total && (
          <span>Total income: {toMoney(income.total, false)}</span>
        )}
        {expense.total && (
          <span>Total expense: {toMoney(expense.total, false)}</span>
        )}
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
                      setDrawerState({
                        isVisible: true,
                        categoryId: data._id,
                      });
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
