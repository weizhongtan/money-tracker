import React from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES } from '../data/categories';

const Wrapper = styled.div`
  height: 90%;
`;
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Pie = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: {
      startDate: '2019-12-01T23:08:33.049Z',
      endDate: '2020-01-21T23:08:33.049Z',
    },
  });
  if (loading || error) return null;

  const out = data.categories
    .map(category => ({
      id: category.name,
      label: category.name,
      value:
        Math.abs(category.transactions_aggregate.aggregate.sum.amount) ?? 0,
    }))
    .sort((a, b) => b.value - a.value)
    .filter(x => x.value > 0);

  return (
    <Wrapper>
      <ResponsivePieCanvas
        data={out}
        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
        pixelRatio={2}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'paired' }}
        borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
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
            translateX: 140,
            itemWidth: 60,
            itemHeight: 14,
            itemsSpacing: 2,
            symbolSize: 14,
            symbolShape: 'circle',
          },
        ]}
      />
    </Wrapper>
  );
};

export default Pie;
