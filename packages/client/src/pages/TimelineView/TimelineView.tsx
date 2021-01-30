import { Bar, BarSvgProps } from '@nivo/bar';
import { Dimensions } from '@nivo/core';
import React, { useState } from 'react';

import { Filters } from '../../App';
import {
  PageDrawer,
  Radio,
  Visualisation,
  VisualisationControls,
} from '../../components';
import { useGetAmountGroupsQuery } from '../../generated/graphql';
import { time, toLabelledValue, toMoney, useTheme } from '../../lib';
import { Nullable, TimePeriod } from '../../types';
import TransactionsView from '../TransactionsView';

type GraphProps = {
  data: any;
  meanValues?: {
    key: string;
    value: number;
  }[];
  maxValue?: number;
  precision: time.OpUnitType;
  amountType: string;
} & BarSvgProps &
  Dimensions;

const Graph: React.FC<GraphProps> = ({
  data,
  meanValues,
  maxValue,
  precision,
  amountType,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Bar
      data={data}
      groupMode="grouped"
      keys={amountType.split(',')}
      indexBy="date"
      margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
      minValue="auto"
      maxValue={maxValue && Math.max(maxValue, 0)}
      colors={({ id }) => theme.amountType[id]}
      axisTop={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: (x) => time(x).format('MMM YY'),
      }}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: (x) => time(x).format('MMM YY'),
      }}
      enableGridY
      labelFormat={(x) => toMoney(Number(x))}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['brighter', 6]] }}
      isInteractive={true}
      tooltip={({ indexValue, value }) => {
        return (
          <span>
            {toLabelledValue(
              time(indexValue).format('MMM YY'),
              toMoney(value, false)
            )}
          </span>
        );
      }}
      markers={
        meanValues &&
        meanValues.map(({ key, value }) => ({
          axis: 'y',
          value: value,
          lineStyle: {
            stroke: theme.amountType[key],
            strokeWidth: 2,
            strokeDasharray: 5,
          },
          legend: `${toMoney(value)}/${precision}`,
        }))
      }
      {...props}
    />
  );
};

type TimeLineViewProps = TimePeriod & Filters;

const TimelineView: React.FC<TimeLineViewProps> = ({
  startDate,
  endDate,
  categoryIdFilter,
  accountIdFilter,
  showControls,
}) => {
  const [precision, setPrecision] = useState<time.OpUnitType>('month');
  const [amountType, setAmountType] = useState<'balance' | 'expense,income'>(
    'balance'
  );
  const [isVisible, setVisible] = useState(false);
  const [transactionViewDates, setTransactionViewDates] = useState<TimePeriod>({
    startDate,
    endDate,
  });

  const { error, data } = useGetAmountGroupsQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      accountId: accountIdFilter,
      categoryId: categoryIdFilter,
      groupBy: precision,
    },
  });
  if (error) return <>error</>;

  const groups =
    data?.groups.map(({ date, balance, expense, income }) => ({
      date: time(date).format('YYYY-MM-DD'),
      balance,
      expense: Math.abs(expense),
      income,
    })) ?? [];

  const meanValues = Object.entries<Nullable<number>>(
    data?.aggregate.aggregate?.avg ?? {}
  )
    .filter(([key, val]) => amountType.includes(key))
    .map(([key, value]) => {
      if (amountType === 'balance') {
        return { key, value: value ?? 0 };
      }
      // make expense and income mean absolute for comparison purposes
      return { key, value: Math.abs(value ?? 0) };
    });

  // sets the graph bounds based on the data
  let maxValue: number;
  if (amountType === 'balance') {
    maxValue = data?.aggregate.aggregate?.max?.balance ?? 0;
  } else {
    maxValue = Math.max(
      Math.abs(data?.aggregate.aggregate?.min?.expense ?? 0),
      Math.abs(data?.aggregate.aggregate?.max?.income ?? 0)
    );
  }

  return (
    <>
      <VisualisationControls show={showControls}>
        <PageDrawer
          visible={
            isVisible &&
            !!transactionViewDates.startDate &&
            !!transactionViewDates.endDate
          }
          onClose={() => setVisible(false)}
        >
          <TransactionsView
            startDate={transactionViewDates.startDate}
            endDate={transactionViewDates.endDate}
            categoryIdFilter={categoryIdFilter}
            accountIdFilter={accountIdFilter}
          />
        </PageDrawer>
        <Radio.Group
          buttonStyle="solid"
          defaultValue={precision}
          onChange={(event) => setPrecision(event.target.value)}
        >
          <Radio.Button value="day">Day</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
          <Radio.Button value="year">Year</Radio.Button>
        </Radio.Group>
        <Radio.Group
          buttonStyle="solid"
          defaultValue={amountType}
          onChange={(event) => setAmountType(event.target.value)}
        >
          <Radio.Button value="balance">Balance</Radio.Button>
          <Radio.Button value="expense,income">
            {'Expense & Income'}
          </Radio.Button>
        </Radio.Group>
      </VisualisationControls>
      <Visualisation>
        {({ width, height }) => (
          <Graph
            width={width}
            height={height}
            data={groups}
            meanValues={meanValues}
            maxValue={maxValue}
            precision={precision}
            amountType={amountType}
            onClick={({ data: { date } }) => {
              const startDate = time(date);
              const endDate = time(startDate).endOf(precision);
              setTransactionViewDates({ startDate, endDate });
              setVisible(true);
            }}
          />
        )}
      </Visualisation>
    </>
  );
};

export default TimelineView;
