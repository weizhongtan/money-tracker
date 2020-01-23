import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

const Variables = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
        isOutsideRange={() => false}
        displayFormat="DD-MM-YYYY"
      />
    </>
  );
};

export default Variables;
