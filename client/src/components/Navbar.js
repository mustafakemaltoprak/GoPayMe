import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button, Icon, Label, Header } from 'semantic-ui-react';

import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    document.title = `Welcome ${user.loginSuccess?.name}`;
  }, []);
  return (
    <Menu  fixed="top" style={{ zIndex: 10000 }}>
      <Container>
        <Menu.Item as={NavLink} exact to="/home" header>
          <img src="/logo192.png" alt="logo" style={{ marginRight: 15 }} />
          GoPayME
          <Icon name="money" />
        </Menu.Item>

        <Menu.Item as="a" style={{ marginLeft: 'auto' }}>
          <Icon name="mail" /> Messages
          <Label color="red">22</Label>
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="users" /> Notifications
          <Label color="teal">22</Label>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
