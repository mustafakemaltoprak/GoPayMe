import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
// import firebase from 'firebase'
import { Grid, Header, Icon, Image, List, Menu, Segment, Sidebar, Sticky } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
const SideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  // var uid = firebase.auth().currentUser.uid;
  // console.log('userrrid', uid)
  return (
    <Sticky>
      {/* <List style={{ paddingTop: '1rem' }} size="big" verticalAlign="middle" selection>
            <Link href="/notifications">
              <List.Item>
                <Icon name="hand point right" size="large" />
                <List.Content>{true && <List.Header content="Notifications" />}</List.Content>
              </List.Item>
            </Link>
            <br /> */}
      {/* <Sidebar.Pushable as={Segment}> */}
      {/* <div style={{border: 'solid 2px green'}}>coolfegfegegegegrgergegegegege egegegeg</div> */}
      <Menu
        // as={Menu}
        animation="overlay"
        icon="labeled"
        // inverted
        vertical
        visible
        // width={''}
        // style={{ overflow: 'hidden' }}
        className="cool"
        style={{ border: 'solid 1px gainsboro', paddingTop: '10rem', overflow: 'hidden', width: '100%' }}
      >
        <Grid>
          <Menu.Item
            as={Link}
            to="/home"
            active={location.pathname === '/home'}
            // onClick={() => {
            //   history.push('/home');
            // }}
          >
            <Icon name="home" />
            Home
          </Menu.Item>
        </Grid>

        <Menu.Item as={Link} to="/fundraisers" active={location.pathname === '/fundraisers'}>
          <Icon name="home" />
          My fundraisers
        </Menu.Item>

        <Menu.Item
          as={Link}
          active={location.pathname === '/dashboard'}
          to='/dashboard'
          // onClick={() => {
          //   history.push('/fundraisers');
          // }}
        >
          <Icon name="home" />
          Profile
        </Menu.Item>

        <Menu.Item
          as="a"
          // active={location.pathname === '/l'}
          to="/login"
          onClick={() => {
            dispatch(logoutUser());
            history.push('/login');
          }}
        >
          <Icon name="home" />
          Logout
        </Menu.Item>
      </Menu>

      {/* <Sidebar.Pusher>
              <Segment basic>
                <Header as="h3">Application Content</Header>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Segment>
            </Sidebar.Pusher> */}
      {/* </Sidebar.Pushable> */}

      {/* <Link href={`/${username}`}>
              <List.Item active={router.query.username === username}>
                <Icon
                  name="user"
                  size="large"
                  {...(router.query.username === username && { color: 'teal' })}
                />
                <List.Content>{pc && <List.Header content="Account" />}</List.Content>
              </List.Item>
            </Link>
            <br />

            <List.Item onClick={() => logoutUser(email)}>
              <Icon name="log out" size="large" />
              <List.Content>{pc && <List.Header content="Logout" />}</List.Content>
            </List.Item> */}
      {/* </List> */}
    </Sticky>
  );
};

export default SideBar;
