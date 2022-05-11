import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Container, Grid, Menu, Input, Segment, Checkbox } from 'semantic-ui-react';
import { fetchData } from '../services/fundraisers-services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFundraisers } from '../redux/actions/fundraiserActions';
import CardItem from '../components/Card';
import Maps from '../components/Maps';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    Favorites: false,
    Following: false,
    Explore: true,
  });
  const [toggle, setToggle] = useState(false);

  const handleClick = (id) => {
    history.push(`/fundraiser/${id}`);
  };

  const handleCurrentPage = (arg) => {
    // setCategories(prev => {...prev, egef: !categories[arg]})
   
      const currentPageCopy = { ...currentPage };
      for (let i in currentPageCopy) {
        if (i !== arg) {
          currentPageCopy[i] = false;
        } else {
          currentPageCopy[i] = true;
        }
      }
      setCurrentPage(currentPageCopy)
      // return { ...prev, [arg]: true };
  
  };
  useEffect(() => {
    fetchData().then((response) => {
      dispatch(fetchFundraisers(response));
      setData(response);
      // console.log('fetched data', response)
    });
  }, [dispatch]);
  return (
    <>
      {/* <Grid>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <div><</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div style={{ display: 'grid', gridTemplateAreas: '1fr 1fr 1fr' }}>
        {data.length > 0 && data.map((dataItem) => <CardItem data={dataItem} key={dataItem._id} />)}
      </div> */}
      <Menu attached="top" tabular>
        <Menu.Item
          name="Explore"
          active={currentPage['Explore']}
          onClick={() => handleCurrentPage('Explore')}
        />
        <Menu.Item
          name="Following"
          active={currentPage['Following']}
          onClick={() => handleCurrentPage('Following')}
        />
        <Menu.Item
          name="Favorites"
          active={currentPage['Favorites']}
          onClick={() => handleCurrentPage('Favorites')}
          // onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Checkbox
              toggle
              label="Maps"
              onChange={() => setToggle((prev) => !prev)}
              checked={toggle}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <div
        attached="bottom"
        style={{ padding: '2rem', border: '1px red solid' }}
        className="cardgrid"
      >
        {!toggle && (
          <>
            {data.length > 0 &&
              data.map((dataItem) => (
                <CardItem data={dataItem} key={dataItem._id} handleClick={handleClick} />
              ))}
          </>
        )}
      </div>
      {toggle && <>{data.length > 0 && <Maps data={data} key={8888} />}</>}
    </>
  );
};

export default Home;
