import React, { useState } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { useQuery } from '@apollo/react-hooks';

import { GET_ACCOUNTS } from '../data/accounts';

const Variables = ({
  loading,
  totalCount,
  searchText,
  setSearchText,
  accountId,
  setAccountId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const { isLoading, error, data } = useQuery(GET_ACCOUNTS);
  if (isLoading || error) return null;

  const options = data?.accounts.map(({ id, name }) => ({
    key: id,
    value: id,
    text: name,
  }));

  console.log(options);

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
      <span>{totalCount} records</span>
      <Dropdown
        selection
        options={options}
        value={accountId}
        onChange={(_, { value }) => setAccountId(value)}
      />
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        element={Input}
        placeholder="Search..."
        value={searchText}
        onChange={event => {
          setSearchText(event.target.value);
        }}
        loading={loading}
        focus
        autoFocus
        fluid
      />
    </>
  );
};

export default Variables;
