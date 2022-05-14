import React, { useState, useEffect } from 'react';
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
  postCategories,
} from '../services/user-services';
import { updateUserDetails } from '../redux/actions/userActions';

const MyProfile = () => {
  const { loginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState({
    Account: true,
    Requests: false,
    Messages: false,
  });

  const [currentNote, setCurrentNote] = useState('');

  //images selection
  const avatar1 = 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg';
  const avatar2 = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg';
  const avatar3 = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
  const avatar4 = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
  const avatar5 = 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg';
  const avatar6 = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState({
    charity: false,
    healthcare: false,
    art: false,
    humanitarian: false,
    animals: false,
    sports: false,
  });

  const handleAvatarSelection = async (arg) => {
    const payload = { image: arg };
    try {
      await avatarUpdate(payload);
      setImage(arg);
    } catch (e) {
      console.error(e);
    }
  };
  console.log('avatar pick', image);

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

    console.log('ARRAYY', categoriesArr);

    try {
      await postCategories({ categories: categoriesArr, userId: loginSuccess.userId });
      setSelectedCategories(categoriesArr);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('checking userId', loginSuccess.userId);
    fetchUserDetails(loginSuccess.userId).then((response) => {
      console.log('check avatar response', response);
      setImage(response.image);
      setSelectedCategories(response.categories);
    });
  }, []);

  console.log('check categories response', selectedCategories);
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
            <div className="userAvatarContainer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                border: 'black 2px solid',
                width: '130px%',
              }}
            >
              <div className="currentCardContainer" style={{ flex: '1' }}>
                <Card style={{width: '200px', height: 'auto'}}>
                  <Image src={image} wrapped ui={false} style={{'border-radius': '50%'}} />
                  <Card.Content>
                    <Card.Header>Matthew</Card.Header>
                    <Card.Meta>
                      <span className="date">Joined in 2015</span>
                    </Card.Meta>
                    <Card.Description>
                      Matthew is a musician living in Nashville
                      <Icon name="edit" style={{'margin-left': '3px'}} />
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="user" />
                    Your Categories List:
                    <ul style={{'text-align': 'center', 'list-style-type': 'none', 'text-transform': 'capitalize'}}>
                      {selectedCategories.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
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
              <div className="userContentContainer"
                style={{
                  flex: '2',
                  display: 'flex',
                  border: 'black 1px solid',
                  'flex-direction': 'column',
                }}
              >
                <h2>Edit your information</h2>
                <div
                  className="avatarSelection"
                  style={{
                    display: 'flex',
                    'flex-direction': 'column',
                  }}
                >
                  <div className="rowImages"
                    style={{ display: 'flex' }}
                  >
                    <img
                      src={avatar1}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar1)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                        'margin-left': '50px',
                        'margin-top': '20px',
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
                        'margin-left': '50px',
                        'margin-top': '20px',
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
                        'margin-left': '50px',
                        'margin-top': '20px',
                      }}
                    />
                  </div>
                  <div className="rowImages"
                    style={{ display: 'flex' }}
                  >
                    <img
                      src={avatar4}
                      alt=""
                      onClick={() => handleAvatarSelection(avatar4)}
                      style={{
                        width: '130px',
                        height: '130px',
                        'border-radius': '50%',
                        'margin-left': '50px',
                        'margin-top': '20px',
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
                        'margin-left': '50px',
                        'margin-top': '20px',
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
                        'margin-left': '50px',
                        'margin-top': '20px',
                      }}
                    />
                  </div>
                </div>

                <div className="categoriesSelection" style={{'margin-top': '25px', border: 'red 1px solid',}}>
                  <h4>Select your categories</h4>
                  <Grid columns={3} divided style={{ width: '30rem', 'justify': 'flex-end', margin: 'auto'}}>
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
                  loginSuccess.notifications.map((item) => (
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
    </>
  );
};

export default MyProfile;
