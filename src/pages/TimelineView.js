import { useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import { Drawer } from 'antd';
import { gql } from 'apollo-boost';
import moment from 'moment';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Radio, Select, Wrapper } from '../components';
import { BaseDataContext, CategoriesList, toMoney } from '../lib';
import TransactionsView from './TransactionsView';

const { Option } = Select;

const GET_AMOUNT_GROUPS = gql`
  query GetAmountGroups(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryId: uuid
    $groupBy: String
  ) {
    groups: func_transactions_by_category_grouped(
      args: { v_category_id: $categoryId, v_group_by: $groupBy }
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: asc }
    ) {
      date
      sum
    }
    aggregate: func_transactions_by_category_grouped_aggregate(
      args: { v_category_id: $categoryId, v_group_by: $groupBy }
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: asc }
    ) {
      aggregate {
        avg {
          sum
        }
      }
    }
  }
`;

const Bar = ({ data, mean, ...props }) => {
  const theme = useContext(ThemeContext);

  return (
    <ResponsiveBar
      data={data}
      keys={['positive', 'neutral']}
      indexBy="date"
      margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
      minValue="auto"
      maxValue="auto"
      colors={({ id }) => theme[id]}
      axisTop={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: x => moment(x).format('MMM YY'),
      }}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: x => moment(x).format('MMM YY'),
      }}
      enableGridY
      labelFormat={toMoney}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['brighter', 6]] }}
      isInteractive={true}
      tooltip={({ value }) => toMoney(value, false)}
      markers={[
        {
          axis: 'y',
          value: mean,
          lineStyle: {
            stroke: 'rgba(0, 0, 0, .35)',
            strokeWidth: 1,
            strokeDasharray: 5,
          },
          legend: `Mean: ${toMoney(mean)}`,
        },
      ]}
      {...props}
    />
  );
};

const Parent = styled.span`
  color: ${({ theme }) => theme.neutral};
`;

const TimelineView = ({ startDate, endDate }) => {
  const baseData = useContext(BaseDataContext);

  const [categoryId, setCategoryId] = useState(null);
  const [precision, setPrecision] = useState('month');
  const [isVisible, setVisible] = useState(false);
  const [transactionViewDates, setTransactionViewDates] = useState({
    startDate: null,
    endDate: null,
  });

  const { loading, error, data } = useQuery(GET_AMOUNT_GROUPS, {
    variables: {
      startDate,
      endDate,
      categoryId,
      groupBy: precision,
    },
  });
  if (loading && typeof data === 'undefined') return null;
  if (error) return 'error';

  const groups = data.groups.map(({ date, sum }) => ({
    date: moment(date).format('YYYY-MM-DD'),
    [sum > 0 ? 'positive' : 'neutral']: sum,
    sum,
  }));

  const categories = new CategoriesList([
    {
      id: null,
      fullName: 'All Categories',
    },
    ...baseData.categories,
  ]);

  return (
    <Wrapper>
      <Drawer
        placement="bottom"
        visible={isVisible}
        onClose={() => setVisible(false)}
        height="75%"
        bodyStyle={{
          padding: '10px',
        }}
      >
        <TransactionsView
          startDate={transactionViewDates.startDate}
          endDate={transactionViewDates.endDate}
          categoryId={categoryId}
        />
      </Drawer>
      <Select
        value={categoryId}
        onChange={setCategoryId}
        showSearch
        optionFilterProp="label"
        dropdownClassName="dropdown"
      >
        {categories.get().map(({ id, fullName, isSub }) => (
          <Option key={id} value={id} label={fullName}>
            {isSub ? fullName : <Parent>{fullName}</Parent>}
          </Option>
        ))}
      </Select>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={precision}
        onChange={event => setPrecision(event.target.value)}
      >
        <Radio.Button value="day">Day</Radio.Button>
        <Radio.Button value="month">Month</Radio.Button>
        <Radio.Button value="year">Year</Radio.Button>
      </Radio.Group>
      <Bar
        data={groups}
        mean={data.aggregate.aggregate.avg.sum}
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
