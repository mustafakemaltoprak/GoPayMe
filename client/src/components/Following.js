import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../components/Card';
import {
  Container,
  Grid,
  Menu,
  Input,
  Segment,
  Checkbox,
  Dropdown,
  Label,
} from 'semantic-ui-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchData } from '../services/fundraisers-services';

const Following = ({ favorites }) => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const { loginSuccess } = useSelector((state) => state.user);

  const handleClick = (id) => {
    history.push(`/fundraiser/${id}`);
  };

  const onLoadMore = () => {
    setSkip(skip + limit);
  };

  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit,
      following: favorites ? '' : loginSuccess.following,
      bookmarked: favorites ? loginSuccess.bookmarked : '',
    };
    // if (!favorites) {
    fetchData(variables).then((response) => {
      // console.log('ressss',response)
      setCount(response.count);

      //  dispatch(fetchFundraisers([...data, ...response.docs]));
      setData([...data, ...response.docs]);
      // console.log('fetched data', response)
      // });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, skip]);

  console.log('foloowing data', data);

  return (
    <div
      attached="bottom"
      style={{ padding: '2rem', border: '1px red solid' }}
      className="cardgrid"
    >
      {
        <>
          {data.length > 0 ? (
            <>
              {data.map((dataItem) => (
                <CardItem data={dataItem} key={dataItem._id} handleClick={handleClick} />
              ))}
              {count >= limit ? (
                <Label onClick={onLoadMore} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  load more
                </Label>
              ) : (
                <p style={{ textAlign: 'center' }}>
                  Your following hasnt created anymore followers{' '}
                </p>
              )}
            </>
          ) : (
            <p>People you follow have not created any fundraisers</p>
          )}
        </>
      }
    </div>
  );
};

export default Following;
