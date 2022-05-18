import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Label, Menu, Segment, Card, Image, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  notificationRespond,
  avatarUpdate,
  fetchUserDetails,
  postCategories,
} from '../services/user-services';
import { updateUserDetails } from '../redux/actions/userActions';
import Categories from './Categories';
import GroupMessages from '../components/GroupMessages';
import { io, Socket } from 'socket.io-client';

import { motion }from 'framer-motion';

const MyProfile = ({ history }) => {

  console.log('history', history);
  const messageProp = history.location?.state?.messageProp;

  const requestsProp = history.location?.state?.requestsProp;

  const socket = useRef();
  const { loginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState({
    Account: messageProp || requestsProp ? false : true,
    Requests: requestsProp ?? false,
    Messages: messageProp ?? false,
  });

  const [currentNote, setCurrentNote] = useState('');

  //images selection
  const avatar1 = 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg';
  const avatar2 = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg';
  const avatar3 = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
  const avatar4 = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
  const avatar5 = 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg';
  const avatar6 = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';

  const avatar7 = 'https://react.semantic-ui.com/images/avatar/large/joe.jpg';
  const avatar8 = 'https://react.semantic-ui.com/images/avatar/large/ade.jpg';
  const [image, setImage] = useState(loginSuccess.image);

  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState({
    charity: loginSuccess.categories.includes('charity') ?? false,
    healthcare: loginSuccess.categories.includes('healthcare') ?? false,
    art: loginSuccess.categories.includes('art') ?? false,
    humanitarian: loginSuccess.categories.includes('humanitarian') ?? false,
    animals: loginSuccess.categories.includes('animals') ?? false,
    sports: loginSuccess.categories.includes('sports') ?? false,
  });

  const handleAvatarSelection = async (arg) => {
    const payload = { image: arg };
    try {
      const response = await avatarUpdate(payload);
      console.log('response', response);
      dispatch(updateUserDetails(response));
      setImage(arg);
    } catch (e) {
      console.error(e);
    }
  };
  // console.log('avatar pick', image);

  const handleClick = (arg) => {
    // setCategories(prev => {...prev, egef: !categories[arg]})

    setCategories((prev) => {
      return { ...prev, [arg]: !categories[arg] };
    });
  };

  const handleSubmit = async () => {
    let categoriesArr = [];
    for (let key in categories) {
      if (categories[key]) {
        categoriesArr.push(key);
      }
    }

    // console.log('ARRAYY', categoriesArr);

    try {
      const response = await postCategories({
        categories: categoriesArr,
        userId: loginSuccess.userId,
      });

      if (response) {
        dispatch(updateUserDetails(response));
        setSelectedCategories(categoriesArr);
      }
      // dispatch(updateUserDetails(response))
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('checking userId', loginSuccess.userId);
    fetchUserDetails(loginSuccess.userId).then((response) => {
      // console.log('check avatar response', response);
      setImage(response.image);
      setSelectedCategories(response.categories);
    });
  }, []);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
  }, []);

  useEffect(() => {
    if (socket.current) {
      console.log('yesssss');
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

    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
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
                width: '900px',
              }}
            >

              <div className="currentCardContainer" style={{ flex: '1', margin: '0 !important', justifyContent: 'center', alignItems: 'center'}}>
                <Card style={{width: '200px', height: 'auto', }}>
                  <Image src={image}
                    wrapped ui={false}
                    size='small circular'
                    // style={{'border-radius': '50%'}}
                    />
                  <Card.Content>
                    <Card.Header>{loginSuccess.name}</Card.Header>
                    <Card.Meta>
                      <span className="userCardEmail" style={{ color: 'black' }}>{loginSuccess.email}</span>
                    </Card.Meta>
                    {/* <Card.Description>
                      Matthew is a musician living in Nashville
                      <Icon name="edit" style={{'margin-left': '3px'}} />
                    </Card.Description> */}
                  </Card.Content>
                  <Card.Content extra style={{ 'text-align': 'center', color: 'black' }}>
                    <Icon name="user" />
                    Your Categories List:
                    <ul
                      style={{
                        'text-align': 'center',
                        'list-style-type': 'none',
                        'text-transform': 'capitalize',
                      }}
                    >
                      {selectedCategories.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Card.Content>
                </Card>
              </div>
              <div
                className="userContentContainer"
                style={{
                  flex: '2',
                  display: 'flex',
                  border: 'green 1px solid',
                  flexDirection: 'column',
                  maxWidth: '100%',
                }}
              >
                <h2
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Edit your information
                </h2>
                <div
                  className="avatarSelection"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className="rowImages" style={{ display: 'flex' }}>
                    <img
                      src={avatar1}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar1)}
                      style={{}}
                    />
                    <img
                      src={avatar2}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar2)}
                      style={{}}
                    />
                    <img
                      src={avatar3}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar3)}
                      style={{}}
                    />
                    <img
                      src={avatar4}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar4)}
                      style={{}}
                    />
                  </div>
                  <div className="rowImages"
                    style={{ display: 'flex' }}
                  >
                    <img
                      src={avatar5}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar5)}
                      style={{}}
                    />
                    <img
                      src={avatar6}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar6)}
                      style={{}}
                    />
                    <img
                      src={avatar7}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar7)}
                      style={{}}
                    />
                    <img
                      src={avatar8}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar8)}
                      style={{}}
                    />

                  </div>
                </div>

                <div
                  className="categoriesSelection"
                  style={{ 'margin-top': '25px', border: 'red 1px solid' }}
                >
                  <h4>Select your categories</h4>
                  <Grid
                    columns={3}
                    divided
                    style={{ width: '30rem', justify: 'flex-end', margin: 'auto' }}
                  >
                    <Grid.Row>
                      <Grid.Column>
                        <Label
                          as="a"
                          color={categories['charity'] && 'teal'}
                          style={{ width: '110px', textAlign: 'center' }}
                          onClick={() => handleClick('charity')}
                        >
                          Charity
                          <Icon name="delete" />
                        </Label>
                      </Grid.Column>
                      <Grid.Column>
                        <Label
                          as="a"
                          color={categories['healthcare'] && 'teal'}
                          style={{ width: '110px', textAlign: 'center' }}
                          onClick={() => handleClick('healthcare')}
                        >
                          Healthcare
                          <Icon name="delete" />
                        </Label>
                      </Grid.Column>
                      <Grid.Column>
                        <Label
                          as="a"
                          color={categories['art'] && 'teal'}
                          style={{ width: '110px', textAlign: 'center' }}
                          onClick={() => handleClick('art')}
                        >
                          Art
                          <Icon name="delete" />
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Grid.Column>
                        <Label
                          as="a"
                          color={categories['humanitarian'] && 'teal'}
                          style={{ width: '110px', textAlign: 'center' }}
                          onClick={() => handleClick('humanitarian')}
                        >
                          Humanitarian
                          <Icon name="delete" />
                        </Label>
                      </Grid.Column>
                      <Grid.Column>
                        <Label
                          as="a"
                          style={{ width: '110px', textAlign: 'center' }}
                          onClick={() => handleClick('animals')}
                          color={categories['animals'] && 'teal'}
                        >
                          Animals
                          <Icon name="delete" />
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Button
                        color="blue"
                        style={{ width: '300px', textAlign: 'center' }}
                        onClick={handleSubmit}
                      >
                        Update Your Categories
                      </Button>
                    </Grid.Row>
                  </Grid>
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
                  loginSuccess.notifications
                    .filter((item) => item.typeof === 'follow')
                    .map((item) => (
                      <Segment vertical>
                        <div>
                          Follow Request from <strong>{item.senderName}</strong>
                          <Label onClick={() => setCurrentNote(item.note)}>View Note</Label>
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
                  <p>You have no requests</p>
                ) : (
                  <p>{currentNote}</p>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* </div> */}
        </>
      )}

      {currentPage['Messages'] && <GroupMessages />}
    </motion.div>
  );
};

export default MyProfile;
