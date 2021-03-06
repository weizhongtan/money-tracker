import { Space } from 'antd';
import React from 'react';

import { time } from '../lib';
import { TimePeriod } from '../types';
import { DatePicker } from '.';

const { MonthPicker, RangePicker } = DatePicker;

type Props = TimePeriod & {
  setDates({ startDate, endDate }: TimePeriod): void;
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
    'Entire Range': [time('2017-01-01').startOf('year'), time()],
  };

  // add the past 4 years
  for (let i = 0; i < 4; i += 1) {
    const year = String(
      time()
        .subtract(i + 1, 'year')
        .year()
    );
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
        allowClear={false}
      />
      <RangePicker
        picker="month"
        onChange={(range) => {
          const start = range?.[0];
          const end = range?.[1];
          if (start && end) {
            setDates({
              startDate: time(start).startOf('day'),
              endDate: time(end).endOf('day'),
            });
          }
        }}
        value={[startDate, endDate]}
        ranges={ranges}
        allowClear={false}
      />
    </Space>
  );
};

export default DateRangeSelect;
