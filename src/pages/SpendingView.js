import { useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import { Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { QUERY } from '../data/transactionsGroupBy';
import { toMoney, toPercent } from '../lib';

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
      // colorBy="sign"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: value => moment(value).format('MMM YY'),
      }}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
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
const PrecisionSelect = styled(Select)`
  width: 300px;
`;

const SpendingView = ({ startDate, endDate }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [precision, setPrecision] = useState('month');
  const { loading, error, data } = useQuery(QUERY, {
    variables: { startDate, endDate, categoryId, groupBy: precision },
  });
  if (loading || error) return null;

  const out = data.groups.map(({ date, sum }) => ({
    date: moment(date).format('YYYY-MM-DD'),
    [sum > 0 ? 'positive' : 'negative']: sum,
  }));

  console.log(out);

  const categories = [
    {
      id: null,
      name: 'All Categories',
    },
    ...data?.categories,
  ];

  return (
    <Wrapper>
      <Select defaultValue={categoryId} onChange={setCategoryId}>
        {categories.map(({ id, name }) => (
          <Option value={id} key={id}>
            {name}
          </Option>
        ))}
      </Select>
      <PrecisionSelect defaultValue={precision} onChange={setPrecision}>
        <Option value="day">Day</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
      </PrecisionSelect>
      <Bar data={out} />
    </Wrapper>
  );
};

export default SpendingView;
