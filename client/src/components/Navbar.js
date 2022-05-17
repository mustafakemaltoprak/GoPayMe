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

import { useSelector, useDispatch } from 'react-redux';
import SearchComponent from './SearchComponent';
import { logoutUser, updateUserDetails } from '../redux/actions/userActions';
import { fetchUserDetails, notificationRespond } from '../services/user-services';
import moment from 'moment';

const Navbar = () => {
  const { loginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    document.title = `Welcome ${loginSuccess.name ? loginSuccess.name : 'Cool User'}`;

    fetchUserDetails(loginSuccess.userId).then((response) => {
      dispatch(updateUserDetails(response));
    });

    // const response = await notificationRespond(payload);
    //                         if (response) dispatch(updateUserDetails(response));
  }, []);

  console.log('loginSuccess', loginSuccess);
  return (
    <Menu fixed="top" style={{ zIndex: 10000 }} borderless>
      <Container>
        <Menu.Item as={Link} to="/home" header style={{ border: 'none' }}>
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

        {/* <Menu.Item as="a" style={{ marginLeft: 'auto' }}>
          <Icon name="mail" /> Messages */}
        {/* <Label color="red"></Label> */}
        {/* </Menu.Item> */}
        <Popup
          trigger={
            <Menu.Item as="a">
              <Icon name="mail" /> Messages
              {loginSuccess.notifications.filter((item) => item.typeof === 'message').length >
                0 && <Label color="red">{loginSuccess.notifications.length}</Label>}
            </Menu.Item>
          }
          flowing
          disabled={
            loginSuccess.notifications.filter((item) => item.typeof === 'message').length < 1
          }
          hoverable
        >
          {loginSuccess.notifications
            .filter((item) => item.typeof === 'message')
            .map((item) => (
              <Segment vertical>
                <p>New Message from {item.senderName}</p>
                <p>Sent {moment(item.date).fromNow()}</p>
                {item.typeof === 'donation' && (
                  <p>
                    {item.senderName} donated {item.amount} {moment(item.date).fromNow()}
                  </p>
                )}
                <Label
                  // as={NavLink}
                  // to='/'
                  style={{ cursor: 'pointer' }}
                  onClick={() => history.push('/account', { messageProp: true })}
                >
                  view
                </Label>
                <Label
                  style={{ cursor: 'pointer' }}
                  onClick={async () => {
                    const payload = {
                      senderId: item.senderId,
                      response: 'dismiss',
                      typeof: 'message',
                    };
                    const response = await notificationRespond(payload);
                    if (response) dispatch(updateUserDetails(response));
                  }}
                >
                  dismiss
                </Label>
              </Segment>
            ))}
        </Popup>

        <Popup
          trigger={
            <Menu.Item as="a">
              <Icon name="alarm" /> Notifications
              {loginSuccess.notifications.filter((item) => item.typeof !== 'message').length > 0 && (
                <Label color="teal">{loginSuccess.notifications.length}</Label>
              )}
            </Menu.Item>
          }
          flowing
          disabled={loginSuccess.notifications.filter((item) => item.typeof !== 'message') < 1}
          hoverable
        >
          {loginSuccess.notifications
            .filter((item) => item.typeof !== 'message')
            .map((item) => (
              <Segment vertical>
                {item.typeof === 'follow' && <p>Follow request from {item.senderName}</p>}
                {item.typeof === 'donation' && (
                  <p>
                    {item.senderName} donated {item.amount} {moment(item.date).fromNow()}
                  </p>
                )}
                <Label
                  // as={NavLink}
                  // to='/'
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    history.push(`${item.typeof === 'follow' ? '/account' : '/dashboard'}`, {
                      requestsProp: item.typeof === 'follow',
                    })
                  }
                >
                  View
                </Label>
                {item.typeof === 'donation' && (
                  <Label
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                      const payload = {
                        senderId: item.senderId,
                        response: 'dismiss',
                        typeof: 'donation',
                      };
                      const response = await notificationRespond(payload);
                      if (response) dispatch(updateUserDetails(response));
                    }}
                  >
                    dismiss
                  </Label>
                )}
              </Segment>
            ))}
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
            src={loginSuccess.image}
          />
          <Dropdown pointing="top left" text={loginSuccess.name ? loginSuccess.name : 'Cool User'}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/account`} text="Account" icon="user" />
              <Dropdown.Item
                as={Link}
                to={`/account`}
                text="Logout"
                icon="user"
                onClick={() => {
                  dispatch(logoutUser());
                  history.push('/login');
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
