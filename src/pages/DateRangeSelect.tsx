import { Space } from 'antd';
import React from 'react';

import { DatePicker } from '../components';
import { time } from '../lib';
import { TimePeriod } from '../types';

const { MonthPicker, RangePicker } = DatePicker;

type Props = TimePeriod & {
  setDates: ({ startDate, endDate }: TimePeriod) => void;
};

const DateRangeSelect: React.FC<Props> = ({ startDate, endDate, setDates }) => {
  const ranges: {
    [index: string]: [time.Dayjs, time.Dayjs];
  } = {
    'This Month': [time().startOf('month'), time().endOf('month')],
    'This Year': [time().startOf('year'), time().endOf('year')],
    'Last Month': [
      time().subtract(1, 'month').startOf('month'),
      time().subtract(1, 'month').endOf('month'),
    ],
    'Last 3 Months': [
      time().subtract(3, 'month').startOf('month'),
      time().endOf('month'),
    ],
    'Last 6 Months': [
      time().subtract(6, 'month').startOf('month'),
      time().endOf('month'),
    ],
    'Last 12 Months': [
      time().subtract(12, 'month').startOf('month'),
      time().endOf('month'),
    ],
    'Last Year': [
      time().subtract(1, 'year').startOf('year'),
      time().subtract(1, 'year').endOf('year'),
    ],
    'Entire Range': [time('2017-01-01').startOf('year'), time()],
  };

  // add the past 3 years
  for (let i = 0; i < 3; i += 1) {
    const year = String(time().subtract(i, 'year').year());
    ranges[year] = [time(year).startOf('year'), time(year).endOf('year')];
  }

  return (
    <Space>
      <MonthPicker
        onChange={(date) => {
          if (date) {
            setDates({
              startDate: time(date).startOf('month'),
              endDate: time(date).endOf('month'),
            });
          }
        }}
        placeholder="Select month"
        value={startDate}
        format="MMM YYYY"
      />
      <RangePicker
        picker="month"
        onChange={([start, end]) => {
          if (start && end) {
            setDates({
              startDate: time(start).startOf('day'),
              endDate: time(end).endOf('day'),
            });
          }
        }}
        value={[startDate, endDate]}
        ranges={ranges}
      />
    </Space>
  );
};

export default DateRangeSelect;
