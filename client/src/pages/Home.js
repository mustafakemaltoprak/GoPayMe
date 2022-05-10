import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Container, Grid, Menu, Input,Segment, Checkbox } from 'semantic-ui-react';
import { fetchData } from '../services/fundraisers-services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFundraisers } from '../redux/actions/fundraiserActions';
import CardItem from '../components/Card';

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handleClick = (id) => {
    history.push(`/fundraiser/${id}`)
  }
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
        <Menu.Item name="Explore" 
        active={true} 
        // onClick={this.handleItemClick} 
        />
        <Menu.Item name="Following" 
        // onClick={this.handleItemClick} 
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Checkbox
              toggle
              label='Maps'
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment attached="bottom" style={{padding: '2rem'}}>
        <div style={{ display: 'grid', gridTemplateAreas: '1fr 1fr 1fr' }}>
        {data.length > 0 && data.map((dataItem) => <CardItem data={dataItem} key={dataItem._id}  handleClick={handleClick}/> )}
      </div>
      </Segment>
    </>
  );
};

export default Home;
