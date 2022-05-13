import React, { useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Icon,
  Label,
  Header,
  Dropdown,
  Image,
  Search,
  Popup,
  Segment,
} from 'semantic-ui-react';

import { useSelector } from 'react-redux';
import SearchComponent from './SearchComponent';

const Navbar = () => {
  const { loginSuccess } = useSelector((state) => state.user);
  const history = useHistory()
  useEffect(() => {
    document.title = `Welcome ${loginSuccess.name ? loginSuccess.name : 'Cool User'}`;
    
  }, [loginSuccess]);

 

  console.log('loginSuccess', loginSuccess);
  return (
    <Menu fixed="top" style={{ zIndex: 10000 }}>
      <Container>
        <Menu.Item as={NavLink} exact to="/home" header>
          <img src="/logo192.png" alt="logo" style={{ marginRight: 15 }} />
          GoPayME
          <Icon name="money" />
        </Menu.Item>
        <Menu.Item header>
          {/* <Search
            // loading={loading}
            placeholder="Search..."
            // onResultSelect={(e, data) =>
            //   dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            // }
            // onSearchChange={handleSearchChange}
            // results={results}
            // value={value}
         /> */}
          <SearchComponent />
        </Menu.Item>

        <Menu.Item as="a" style={{ marginLeft: 'auto' }}>
          <Icon name="mail" /> Messages
          <Label color="red">22</Label>
        </Menu.Item>

        <Popup
          trigger={
            <Menu.Item as="a">
              <Icon name="alarm" /> Notifications
              {loginSuccess.notifications.length > 0 && (
                <Label color="teal">
                  {loginSuccess.notifications.length}
                </Label>
              )}
            </Menu.Item>
          }
          flowing
          disabled={loginSuccess.notifications.length < 1}
          hoverable
        >
          {loginSuccess.notifications.map((item) => (
            <Segment vertical>
              <p>Follow request from {item.senderName}</p>
              <Label as={NavLink} to="/account" onClick={() => history.push('/account')}>
                View
              </Label>
            </Segment>
          ))}
          {/* <Grid.Row>
            <Header as="h4">Basic Plan</Header>

            <Button>Choose</Button>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Header as="h4">Business Plan</Header>

            <Button>Choose</Button>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Header as="h4">Premium Plan</Header>

            <Button>Choose</Button>
          </Grid.Row> */}
        </Popup>

        {/* <Menu.Item as="a">
          <Icon name="users" /> Notifications
          <Label color="teal">
            {loginSuccess.notifications.length > 0 && loginSuccess.notifications.length}
          </Label>
        </Menu.Item> */}
        <Menu.Item>
          <Image
            avatar
            spaced="right"
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          />
          <Dropdown pointing="top left" text={loginSuccess.name ? loginSuccess.name : 'Cool User'}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
              <Dropdown.Item as={Link} to={`/account`} text="My profile" icon="user" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
