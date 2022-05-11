import React, { useState } from 'react';
import { Button, Label, Search } from 'semantic-ui-react';
import _ from 'lodash';
import { searchService } from '../services/common';

const SearchComponent = () => {
  const [loading, setLoading] = useState(false);
  const [valueInit, setValue] = useState('');
  const [results, setResults] = useState([]);

  const handleResultSelect = (params) => {};

  const resultRenderer = (obj) => (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => console.log('from obj', obj)}
      >
        {obj.title ? (
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            {obj.title} <p style={{ color: 'red' }}>User</p>
          </p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {obj.name} <p style={{ color: 'green' }}>Fund</p>
          </div>
        )}
        {/* <Label content="follow" color="green" /> */}
      </div>
    </>
  );

  const handleSearchChange = async (e, { value }) => {
    let resultsArray = [];

    setTimeout(() => {
      if (value.length < 1) {
        setLoading(false);
        setResults([]);
        setValue('');
        return;
      }

      // console.log('typing values', value);
    }, 100);

    setValue(value);
    console.log('chat data', value);
    const data = await searchService(value);

    console.log('fffff', [...data.users, ...data.fundraisers]);
    if (data.users.length + data.fundraisers.length > 4) {
      setResults([...data.users, ...data.fundraisers]);
    } else{
      setResults([...data.users, ...data.fundraisers])
    }
  };
  return (
    <Search
      loading={loading}
      placeholder="Search User or fundraiser"
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 10, { loading: true })}
      results={results}
      value={valueInit}
      resultRenderer={resultRenderer}
      // {...this.props}
    />
  );
};

export default SearchComponent;
