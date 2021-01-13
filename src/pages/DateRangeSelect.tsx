import { DatePicker, Menu } from 'antd';
import moment from 'moment';
import React from 'react';

import { TimePeriod } from '../types';

const { MonthPicker, RangePicker } = DatePicker;

type Props = TimePeriod & {
  setDates: ({ startDate, endDate }: TimePeriod) => void;
};

const DateRangeSelect: React.FC<Props> = ({ startDate, endDate, setDates }) => {
  const ranges: {
    [index: string]: [moment.Moment, moment.Moment];
  } = {
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'This Year': [moment().startOf('year'), moment().endOf('year')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'Last 3 Months': [
      moment().subtract(3, 'month').startOf('month'),
      moment().endOf('month'),
    ],
    'Last 6 Months': [
      moment().subtract(6, 'month').startOf('month'),
      moment().endOf('month'),
    ],
    'Last 12 Months': [
      moment().subtract(12, 'month').startOf('month'),
      moment().endOf('month'),
    ],
    'Last Year': [
      moment().subtract(1, 'year').startOf('year'),
      moment().subtract(1, 'year').endOf('year'),
    ],
    'Entire Range': [moment('2017-01-01').startOf('year'), moment()],
  };

  // add the past 3 years
  for (let i = 0; i < 3; i += 1) {
    const year = String(moment().subtract(i, 'year').year());
    ranges[year] = [moment(year).startOf('year'), moment(year).endOf('year')];
  }

  return (
    <div>
      <Menu theme="dark">
        <Menu.Item>
          <MonthPicker
            onChange={(date) => {
              if (date) {
                setDates({
                  startDate: moment(date).startOf('month'),
                  endDate: moment(date).endOf('month'),
                });
              }
            }}
            placeholder="Select month"
            value={startDate}
            format="MMM YYYY"
          />
        </Menu.Item>
        <Menu.Item>
          <RangePicker
            picker="month"
            onChange={([start, end]) => {
              if (start && end) {
                setDates({
                  startDate: moment(start).startOf('day'),
                  endDate: moment(end).endOf('day'),
                });
              }
            }}
            value={[startDate, endDate]}
            ranges={ranges}
          />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default DateRangeSelect;
