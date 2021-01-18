import { Line } from '@nivo/line';
import { Space, Tag } from 'antd';
import React, { useState } from 'react';

import { Filters } from '../../App';
import { Radio, Visualisation, VisualisationControls } from '../../components';
import { time, toMoney } from '../../lib';
import { TimePeriod } from '../../types';
import { useData } from './data';

const getBottomAxisProp = ({ startDate, endDate }: TimePeriod) => {
  const duration = endDate.diff(startDate, 'days');
  if (duration <= 7) {
    return {
      format: '%d %b',
      tickValues: 'every day',
    };
  }
  if (duration <= 31) {
    return {
      format: '%d %b',
      tickValues: 'every 2 days',
    };
  }
  if (duration <= 62) {
    return {
      format: "%b '%y",
      tickValues: 'every 1 week',
    };
  }
  if (duration <= 365) {
    return {
      format: "%b '%y",
      tickValues: 'every 1 month',
    };
  }
  return {
    format: "%b '%y",
    tickValues: 'every 3 months',
  };
};

type CumulativeViewProps = TimePeriod & Filters;

const CumulativeView: React.FC<CumulativeViewProps> = ({
  startDate,
  endDate,
  accountIdFilter,
}) => {
  const defaultPrecision =
    endDate.diff(startDate, 'months') >= 6 ? 'week' : 'day';
  const [precision, setPrecision] = useState(defaultPrecision);
  const { loading, error, balances } = useData({
    startDate,
    endDate,
    accountId: accountIdFilter,
    precision,
  });
  if (loading || balances === undefined) return null;
  if (error) return <>'error'</>;

  const series = [
    {
      id: '£',
      data: balances.map(({ date, sum }) => ({
        x: time(date).format('YYYY-MM-DD'),
        y: sum,
      })),
    },
  ];

  return (
    <>
      <VisualisationControls>
        <Space>
          <Radio.Group
            buttonStyle="solid"
            defaultValue={precision}
            onChange={(event) => setPrecision(event.target.value)}
          >
            <Radio.Button value="day">Day</Radio.Button>
            <Radio.Button value="week">Week</Radio.Button>
            <Radio.Button value="month">Month</Radio.Button>
          </Radio.Group>
        </Space>
      </VisualisationControls>
      <Visualisation>
        {({ width, height }) => (
          <Line
            width={width}
            height={height}
            data={series}
            margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
            xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'day',
            }}
            yScale={{
              type: 'linear',
              min:
                Math.min(...series[0].data.map(({ y }) => y)) > 0 ? 0 : 'auto',
              max:
                Math.max(...series[0].data.map(({ y }) => y)) < 0 ? 0 : 'auto',
            }}
            curve="stepAfter"
            axisLeft={{
              format: toMoney,
            }}
            axisBottom={getBottomAxisProp({ startDate, endDate })}
            animate
            enableArea
            pointSize={7}
            pointBorderWidth={1}
            pointBorderColor="#fff"
            enableSlices="x"
            sliceTooltip={({ slice }) => {
              const { data } = slice.points[0];
              return (
                <Tag>
                  {time(data.x).format('DD MMM YY')} - {toMoney(data.y, false)}
                </Tag>
              );
            }}
          />
        )}
      </Visualisation>
    </>
  );
};

export default CumulativeView;
