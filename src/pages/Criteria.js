import React from 'react';
import { Input } from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';

const Criteria = ({ totalCount, searchText, setSearchText, loading }) => {
  return (
    <>
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
      <p>{totalCount} records</p>
    </>
  );
};

export default Criteria;
