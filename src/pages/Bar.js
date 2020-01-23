import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from '../data/categories';

const Wrapper = styled.div`
  height: 90%;
`;

const MyResponsiveBarCanvas = ({ startDate, endDate }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { startDate, endDate },
  });
  if (loading || error) return null;

  const out = data.categories
    .map(category => ({
      name: category.name,
      value:
        Math.abs(category.transactions_aggregate.aggregate.sum.amount) ?? 0,
    }))
    .sort((a, b) => b.value - a.value)
    .filter(x => x.value > 0);

  console.log(out);

  return (
    <Wrapper>
      <ResponsiveBarCanvas
        data={out}
        indexBy="name"
        margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
        pixelRatio={2}
        padding={0.15}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        groupMode="stacked"
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
          legend: '',
          legendOffset: 36,
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 36,
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        isInteractive={true}
      />
    </Wrapper>
  );
};

export default MyResponsiveBarCanvas;
