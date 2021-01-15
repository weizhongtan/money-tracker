import { BarSvgProps, ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import React, { useState } from 'react';

import { PageDrawer, Radio, Select, Wrapper } from '../../components';
import { useGetAmountGroupsQuery } from '../../generated/graphql';
import { toMoney, useBaseData, useTheme } from '../../lib';
import { TimePeriod } from '../../types';
import TransactionsView from '../TransactionsView';

const { Option } = Select;

type GraphProps = {
  data: any;
  meanValues: {
    key: string;
    value: number;
  }[];
  maxValue: number;
  precision: moment.unitOfTime.StartOf;
  amountType: string;
} & BarSvgProps;

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
    <ResponsiveBar
      data={data}
      groupMode="grouped"
      keys={amountType.split(',')}
      indexBy="date"
      margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
      minValue="auto"
      maxValue={Math.max(maxValue, 0)}
      colors={({ id }) => theme.amountType[id]}
      axisTop={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: (x) => moment(x).format('MMM YY'),
      }}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: (x) => moment(x).format('MMM YY'),
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
            {moment(indexValue).format('MMM YY')} - {toMoney(value, false)}
          </span>
        );
      }}
      markers={meanValues.map(({ key, value }) => ({
        axis: 'y',
        value: value,
        lineStyle: {
          stroke: theme.amountType[key],
          strokeWidth: 2,
          strokeDasharray: 5,
        },
        legend: `${toMoney(value)}/${precision}`,
      }))}
      {...props}
    />
  );
};

type TimeLineViewProps = TimePeriod;

const TimelineView: React.FC<TimeLineViewProps> = ({ startDate, endDate }) => {
  const baseData = useBaseData();

  const [categoryId, setCategoryId] = useState('all');
  const [precision, setPrecision] = useState<moment.unitOfTime.StartOf>(
    'month'
  );
  const [amountType, setAmountType] = useState<'balance' | 'expense,income'>(
    'balance'
  );
  const [isVisible, setVisible] = useState(false);
  const [transactionViewDates, setTransactionViewDates] = useState<TimePeriod>({
    startDate,
    endDate,
  });

  const { loading, error, data } = useGetAmountGroupsQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      categoryId: categoryId === 'all' ? null : categoryId,
      groupBy: precision,
    },
  });
  if (loading || typeof data === 'undefined') return null;
  if (error) return <>error</>;

  const groups = data.groups.map(({ date, balance, expense, income }) => ({
    date: moment(date).format('YYYY-MM-DD'),
    balance,
    expense: Math.abs(expense),
    income,
  }));

  const categories = [
    {
      id: 'all',
      name: 'All Categories',
    },
    ...baseData.categories,
  ];

  const meanValues = Object.entries(
    data?.aggregate.aggregate?.avg as Record<string, number>
  )
    .filter(([key, val]) => amountType.includes(key))
    .map(([key, value]) => {
      if (amountType === 'balance') {
        return { key, value };
      }
      // make expense and income mean absolute for comparison purposes
      return { key, value: Math.abs(value) };
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
    <Wrapper>
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
          categoryId={categoryId}
        />
      </PageDrawer>
      <Select
        value={categoryId}
        onSelect={(val) => setCategoryId(val as string)}
        showSearch
        optionFilterProp="label"
      >
        {categories.map(({ id, name }) => (
          <Option key={id} value={id} label={name}>
            {name}
          </Option>
        ))}
      </Select>
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
        <Radio.Button value="expense,income">{'Expense & Income'}</Radio.Button>
      </Radio.Group>
      <Graph
        data={groups}
        meanValues={meanValues}
        maxValue={maxValue}
        precision={precision}
        amountType={amountType}
        onClick={({ data: { date } }) => {
          const startDate = moment(date);
          const endDate = moment(startDate).endOf(precision);
          setTransactionViewDates({ startDate, endDate });
          setVisible(true);
        }}
      />
    </Wrapper>
  );
};

export default TimelineView;
