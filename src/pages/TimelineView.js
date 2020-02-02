import './TimelineView.css';

import { useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import { gql } from 'apollo-boost';
import moment from 'moment';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Select, Wrapper } from '../components';
import { CategoriesList, toMoney } from '../lib';

const { Option } = Select;

const GET_AMOUNT_GROUPS = gql`
  query GetAmountGroups(
    $startDate: timestamptz
    $endDate: timestamptz
    $categoryId: uuid
    $groupBy: String
  ) {
    categories: view_categories_with_parents(order_by: { full_name: asc }) {
      id
      name: full_name
    }
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

const Bar = ({ data, mean }) => {
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
            'stroke-dasharray': 5,
          },
          legend: `Mean: ${toMoney(mean)}`,
        },
      ]}
    />
  );
};

const Parent = styled.span`
  color: ${({ theme }) => theme.neutral};
`;

const TimelineView = ({ startDate, endDate }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [precision, setPrecision] = useState('month');
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
      name: 'All Categories',
    },
    ...data.categories,
  ]);

  return (
    <Wrapper>
      <Select
        value={categoryId}
        onChange={setCategoryId}
        showSearch
        optionFilterProp="label"
        dropdownClassName="dropdown"
      >
        {categories.get().map(({ id, name, isSub }) => (
          <Option key={id} value={id} label={name}>
            {isSub ? name : <Parent>{name}</Parent>}
          </Option>
        ))}
      </Select>
      <Select defaultValue={precision} onChange={setPrecision}>
        <Option value="day">Day</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      <Bar data={groups} mean={data.aggregate.aggregate.avg.sum} />
    </Wrapper>
  );
};

export default TimelineView;
