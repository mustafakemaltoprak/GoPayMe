import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Icon, Image, Button, Popup, TextArea } from 'semantic-ui-react';
import { createNotification, fetchUserDetails } from '../services/user-services';
// import UserChat from '../components/UserChat';
// import UserDetails from '../components/UserDetails';
function Profile() {
  const location = useLocation();
  const [textValue, setTextValue] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [detailsData, setDetailsData] = useState('');

  const url = location.pathname.split('/').slice(-1)[0];

  useEffect(() => {
    fetchUserDetails(url).then((response) => setDetailsData(response));
  }, [url]);

  console.log('detailsData', detailsData);
  return (
    <div
      className="profileContainer"
      style={{ display: 'flex', justifyContent: 'space-between', border: 'black 1px solid' }}
    >
      <div className="cardContainer" style={{ flex: '1' }}>
        <Card>
          <Image src={detailsData.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{detailsData.name}</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            {detailsData.description ? (
              <Card.Description>{detailsData.description}</Card.Description>
            ) : (
              <Card.Description>No description yet</Card.Description>
            )}
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {detailsData.following?.length > 0
                ? detailsData.following?.length
                : '0 '}
              Friends
            </a>
          </Card.Content>
        </Card>
        <div>
          {/* <Button primary>
            <Icon name="user"></Icon>
            Follow
          </Button> */}
          <Popup
            trigger={
              <Button color="red" icon="user" content={requestSent ? 'Request sent' : 'Follow'} />
            }
            content={
              <>
                <h2></h2>
                <TextArea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                <Button
                  color="blue"
                  content="Add personal note"
                  onClick={async () => {
                    const payload = {
                      typeof: 'follow',
                      targetUser: url,
                      note: textValue,
                    };
                    const data = await createNotification(payload);
                    setRequestSent(true);

                    console.log('received', data);
                  }}
                />
              </>
            }
            on="click"
            position="top right"
          />

          <Button secondary>
            <Icon name="rocketchat"></Icon>
            Message
          </Button>
        </div>
      </div>
      <div className="userContentContainer" style={{ flex: '3', border: 'black 1px solid' }}>
        <h1>Messages with {detailsData.name}</h1>
        {/* <UserDetails></UserDetails> */}
      </div>
    </div>
  );
}
export default Profile;
