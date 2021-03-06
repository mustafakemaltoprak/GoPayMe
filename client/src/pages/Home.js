import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
import { fetchData } from '../services/fundraisers-services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFundraisers } from '../redux/actions/fundraiserActions';
import CardItem from '../components/Card';
import Maps from '../components/Maps';
import Following from '../components/Following';

const Home = () => {
  const history = useHistory();
  const { loginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    Favorites: false,
    Following: false,
    Explore: true,
  });
  const [toggle, setToggle] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [count, setCount] = useState(0);

  const handleClick = (id) => {
    history.push(`/fundraiser/${id}`);
  };

  const handleCurrentPage = (arg) => {
    

    const currentPageCopy = { ...currentPage };
    for (let i in currentPageCopy) {
      if (i !== arg) {
        currentPageCopy[i] = false;
      } else {
        currentPageCopy[i] = true;
      }
    }
    setCurrentPage(currentPageCopy);
    
  };
  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit,
      categories: loginSuccess.categories,
    };
    fetchData(variables).then((response) => {
      
      setCount(response.count);

      dispatch(fetchFundraisers([...data, ...response.docs]));
      setData([...data, ...response.docs]);
     
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit, skip]);

  const onLoadMore = () => {
    setSkip(skip + limit);
  };

  console.log('Count', count);
  return (
    <>
      
      <Menu attached="top" tabular>
        <Menu.Item
          name="Explore"
          active={currentPage['Explore']}
          onClick={() => handleCurrentPage('Explore')}
        />
        <Menu.Item
          name="Following"
          active={currentPage['Following']}
          onClick={() => {
            handleCurrentPage('Following');
          }}
        />
        <Menu.Item
          name="Favorites"
          active={currentPage['Favorites']}
          onClick={() => handleCurrentPage('Favorites')}
         
        />

        
        <Menu.Menu position="right">
          <Menu.Item>
            <Dropdown
              pointing="top left"
              text={'Sort'}
              style={{ marginRight: 20 }}
            >
              <Dropdown.Menu style={{ zIndex: 12000 }}>
                <Dropdown.Item text="Most popular" icon="plus" />
                <Dropdown.Item text="latest" icon="plus" />
              </Dropdown.Menu>
            </Dropdown>
            <Checkbox
              toggle
              label="Maps"
              onChange={() => setToggle((prev) => !prev)}
              checked={toggle}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {currentPage['Explore'] && (
        <>
          <div
            attached="bottom"
            style={{
              padding: '2rem',
              width: '910px',
              height: '1px',
            }}
          >
            <div className="cardgrid">
              {!toggle ? (
                <>
                  {data.length > 0 &&
                    data.map((dataItem) => (
                      <CardItem
                        data={dataItem}
                        key={dataItem._id}
                        handleClick={handleClick}
                      />
                    ))}
                </>
              ) : (
                <></>
              )}
            </div>
            {!toggle ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // border: '1px green solid',
                }}
              >
                {' '}
                {count >= limit ? (
                  <Label
                    onClick={onLoadMore}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    load more
                  </Label>
                ) : (
                  <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                    No more fundraisers
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          {toggle && (
            <div>{data.length > 0 && <Maps data={data} key={8888} />}</div>
          )}
        </>
      )}

      {currentPage['Following'] && <Following />}

      {currentPage['Favorites'] && <Following favorites={true} />}
    </>
  );
};

export default Home;
