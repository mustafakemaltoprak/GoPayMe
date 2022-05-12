import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Container, Button, Icon, Label, Header, Dropdown, Image, Search } from 'semantic-ui-react';

import { useSelector } from 'react-redux';
import SearchComponent from './SearchComponent';

const Navbar = () => {
  const {loginSuccess} = useSelector((state) => state.user);
  useEffect(() => {
    document.title = `Welcome ${loginSuccess.name ? loginSuccess.name : 'Cool User'}`;
  });

  console.log('loginSuccess', loginSuccess)
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
        <Menu.Item as="a">
          <Icon name="users" /> Notifications
          <Label color="teal">22</Label>
        </Menu.Item>
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
