import { useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Select from '../components/Select';
import { QUERY } from '../data/transactionsGroupBy';
import { toMoney } from '../lib';

const { Option } = Select;

const Bar = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <ResponsiveBar
      data={data}
      keys={['positive', 'negative']}
      indexBy="date"
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      minValue="auto"
      maxValue="auto"
      colors={[theme.positive, theme.neutral]}
      axisTop={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: value => moment(value).format('MMM YY'),
      }}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: value => moment(value).format('MMM YY'),
      }}
      enableGridY
      labelFormat={toMoney}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['brighter', 6]] }}
      isInteractive={true}
    />
  );
};

const Wrapper = styled.div`
  height: 90%;
`;

const SpendingView = ({ startDate, endDate }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [precision, setPrecision] = useState('month');
  const { loading, error, data } = useQuery(QUERY, {
    variables: { startDate, endDate, categoryId, groupBy: precision },
  });
  if (loading || error) return null;

  const series = data.groups.map(({ date, sum }) => ({
    date: moment(date).format('YYYY-MM-DD'),
    [sum > 0 ? 'positive' : 'negative']: sum,
    sum,
  }));

  const numOfGroups = endDate.diff(startDate, precision) + 1;
  const series2 = new Array(numOfGroups).fill(null).map((_, index) => {
    const expectedDate = moment(startDate)
      .add(index, precision)
      .format('YYYY-MM-DD');
    const existingDataPoint = series.find(({ date }) => date === expectedDate);
    if (existingDataPoint) {
      return existingDataPoint;
    }
    return {
      date: expectedDate,
    };
  });

  const categories = [
    {
      id: null,
      name: 'All Categories',
    },
    ...data?.categories,
  ];

  return (
    <Wrapper>
      <Select
        defaultValue={categoryId}
        onChange={setCategoryId}
        showSearch
        optionFilterProp="children"
      >
        {categories.map(({ id, name }) => (
          <Option value={id} key={id}>
            {name}
          </Option>
        ))}
      </Select>
      <Select defaultValue={precision} onChange={setPrecision}>
        <Option value="day">Day</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
      </Select>
      <Bar data={series2} />
    </Wrapper>
  );
};

export default SpendingView;
