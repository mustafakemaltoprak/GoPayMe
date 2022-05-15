import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Grid,
  Label,
  Menu,
  Segment,
  Card,
  Image,
  Icon,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  notificationRespond,
  avatarUpdate,
  fetchUserDetails,
} from '../services/user-services';
import { updateUserDetails } from '../redux/actions/userActions';
import Categories from './Categories';
import GroupMessages from '../components/GroupMessages';
import { io, Socket } from 'socket.io-client';

const MyProfile = () => {
   const socket = useRef();
  const { loginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState({
    Account: true,
    Requests: false,
    Messages: false,
  });



  const [currentNote, setCurrentNote] = useState('');

  //images selection
  const avatar1 =
    'https://react.semantic-ui.com/images/avatar/large/daniel.jpg';
  const avatar2 =
    'https://react.semantic-ui.com/images/avatar/large/elliot.jpg';
  const avatar3 = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
  const avatar4 = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
  const avatar5 = 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg';
  const avatar6 =
    'https://react.semantic-ui.com/images/avatar/large/matthew.png';
  const [image, setImage] = useState('');

  const handleAvatarSelection = async (arg) => {
    const payload = { image: arg };
    try {
      await avatarUpdate(payload);
      setImage(arg);
    } catch (e) {
      console.error(e);
    }
  };
  // console.log('avatar pick', image);
  useEffect(() => {
    console.log('checking userId', loginSuccess.userId);
    fetchUserDetails(loginSuccess.userId).then((response) => {
      // console.log('check avatar response', response);
      setImage(response.image);
    });
  }, []);

     useEffect(() => {
       socket.current = io('ws://localhost:8900');
     })

    useEffect(() => {

      if(socket.current){
        console.log('yesssss')
        socket.current.emit('addUser', loginSuccess.userId);
        socket.current.on('getUsers', (users) => {
          console.log('socket users', users);
        });
      }
    }, [loginSuccess]);

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
    setCurrentPage(currentPageCopy);
    // return { ...prev, [arg]: true };
  };

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
          name="Account"
          active={currentPage['Account']}
          onClick={() => handleCurrentPage('Account')}
        />
        <Menu.Item
          name="Requests"
          active={currentPage['Requests']}
          onClick={() => handleCurrentPage('Requests')}
        />
        <Menu.Item
          name="Messages"
          active={currentPage['Messages']}
          onClick={() => handleCurrentPage('Messages')}
          // onClick={this.handleItemClick}
        />
      </Menu>

      {currentPage['Account'] && (
        <>
          <div
            attached="bottom"
            style={{ paddingTop: '2rem', border: '1px red solid' }}
            className="cardgrid"
          >
            <div
              className="userAvatarContainer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                border: 'black 2px solid',
                width: '130px%',
              }}
            >
              <div className="currentCardContainer" style={{ flex: '1' }}>
                <Card>
                  <Image src={image} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Matthew</Card.Header>
                    <Card.Meta>
                      <span className="date">Joined in 2015</span>
                    </Card.Meta>
                    <Card.Description>
                      Matthew is a musician living in Nashville.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                      22 Friends
                    </a>
                  </Card.Content>
                </Card>
                <div>
                  <a href="/profile">
                    <Button primary>
                      <Icon name="user"></Icon>
                    </Button>
                  </a>
                  <a href="/messages">
                    <Button secondary>
                      <Icon name="rocketchat"></Icon>
                    </Button>
                  </a>
                </div>
              </div>
              <div
                className="userContentContainer"
                style={{
                  flex: '3',
                  display: 'flex',
                  border: 'black 1px solid',
                  'flex-direction': 'column',
                }}
              >
                <h1>Avatar selection</h1>
                <div
                  className="avatarSelection"
                  style={{
                    border: 'yellow 2px solid',
                    display: 'flex',
                    'flex-direction': 'column',
                  }}
                >
                  <div
                    className="rowImages"
                    style={{ border: 'blue 1px solid', display: 'flex' }}
                  >
                    <img
                      src={avatar1}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar1)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                      }}
                    />
                    <img
                      src={avatar2}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar2)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                      }}
                    />
                    <img
                      src={avatar3}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar3)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                      }}
                    />
                  </div>
                  <div
                    className="rowImages"
                    style={{ border: 'blue 1px solid', display: 'flex' }}
                  >
                    <img
                      src={avatar4}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar4)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                      }}
                    />
                    <img
                      src={avatar5}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar5)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                      }}
                    />
                    <img
                      src={avatar6}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar6)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                      }}
                    />
                  </div>
                </div>
                <div className="descriptionContainer">
                  <h4>User Description</h4>
                  <span>
                    May the fourth is Stars Wars Day (for obvious reasons) and
                    we’re ready for the day of remembrance with these Jedi jokes
                    and memes
                  </span>
                </div>
                <div className="categoriesSelection">
                  <Categories />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {currentPage['Requests'] && (
        <>
          {/* <div
            attached="bottom"
            style={{ padding: '2rem', border: '4px red solid' }}
            className="cardgrid"
          > */}
          <Grid
            columns={2}
            divided
            attached="bottom"
            style={{ padding: '2rem', border: '4px red solid' }}
            className="cardgrid"
          >
            <Grid.Row>
              <Grid.Column width={4}>
                {/* {loginSuccess.notifications.length < 0 ? <} */}
                {loginSuccess.notifications.length > 0 &&
                  loginSuccess.notifications.filter(item => item.typeof === 'follow').map((item) => (
                    <Segment vertical>
                      <div>
                        Follow Request from <strong>{item.senderName}</strong>
                        <Label onClick={() => setCurrentNote(item.note)}>
                          View Note
                        </Label>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <Button
                          circular
                          content="accept"
                          color="blue"
                          onClick={async () => {
                            const payload = {
                              senderId: item.senderId,
                              response: 'accept',
                              typeof: 'follow',
                            };
                            const response = await notificationRespond(payload);
                            if (response) dispatch(updateUserDetails(response));
                          }}
                        />
                        <Button
                          circular
                          content="reject"
                          color="red"
                          onClick={async () => {
                            const payload = {
                              senderId: item.senderId,
                              response: 'reject',
                              typeof: 'follow',
                            };
                            const response = await notificationRespond(payload);
                            if (response) dispatch(updateUserDetails(response));
                          }}
                        />
                      </div>
                    </Segment>
                  ))}
              </Grid.Column>
              <Grid.Column width={12}>
                {loginSuccess.notifications.length < 1 ? (
                  <p>You have no notifications</p>
                ) : (
                  <p>{currentNote}</p>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* </div> */}
        </>
      )}

      {currentPage['Messages'] && (<GroupMessages/>)}
    </>
  );
};

export default MyProfile;
