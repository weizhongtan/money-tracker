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
      />
      <MonthPicker
        onChange={date => {
          setStartDate(moment(date).startOf('month'));
          setEndDate(moment(date).endOf('month'));
        }}
        placeholder="Select month"
      />
      <RangePicker
        onChange={([start, end]) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
    </>
  );
};

export default Variables;
