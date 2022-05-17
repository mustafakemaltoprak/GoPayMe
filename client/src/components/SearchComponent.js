import React, { useState } from 'react';
import { Button, Label, Search } from 'semantic-ui-react';
import _ from 'lodash';
import { searchService } from '../services/common';
import { useHistory } from 'react-router-dom';

const SearchComponent = () => {
  const [loading, setLoading] = useState(false);
  const [valueInit, setValue] = useState('');
  const [results, setResults] = useState([]);

  const history = useHistory();
  const handleResultSelect = (params) => {};

  const resultRenderer = (obj) => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {obj.title ? (
          <div
            style={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={() => history.push(`/fundraiser/${obj._id}`)}
          >
            {obj.title}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{obj.name}</div>
            <Label style={{ color: 'green' }} onClick={() => history.push(`profile/${obj.userId}`)}>
              view user
            </Label>
          </>
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
    } else {
      setResults([...data.users, ...data.fundraisers]);
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
