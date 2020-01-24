import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const Variables = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
      <WeekPicker
        onChange={date => {
          setStartDate(moment(date).startOf('week'));
          setEndDate(moment(date).endOf('week'));
        }}
        placeholder="Select week"
        value={startDate}
      />
      <MonthPicker
        onChange={date => {
          setStartDate(moment(date).startOf('month'));
          setEndDate(moment(date).endOf('month'));
        }}
        placeholder="Select month"
        value={startDate}
      />
      <RangePicker
        onChange={([start, end]) => {
          setStartDate(start);
          setEndDate(end);
        }}
        value={[startDate, endDate]}
        ranges={{
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [
            moment()
              .subtract(1, 'month')
              .startOf('month'),
            moment()
              .subtract(1, 'month')
              .endOf('month'),
          ],
          'Last 6 Months': [
            moment()
              .subtract(6, 'month')
              .startOf('month'),
            moment().endOf('month'),
          ],
          'Last 12 Months': [
            moment()
              .subtract(12, 'month')
              .startOf('month'),
            moment().endOf('month'),
          ],
          'This Year': [moment().startOf('year'), moment().endOf('year')],
          'Last Year': [
            moment()
              .subtract(1, 'year')
              .startOf('year'),
            moment()
              .subtract(1, 'year')
              .endOf('year'),
          ],
          'Entire Range': [moment('2017').startOf('year'), moment()],
        }}
      />
    </>
  );
};

export default Variables;
