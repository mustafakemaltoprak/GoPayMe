import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import UserChat from '../components/UserChat'
import UserDetails from '../components/UserDetails'

function ProfileChat() {

  return (
    <div className='profileContainer' style={{ display: 'flex', justifyContent: 'space-between', border: 'black 1px solid', }}>
      <div className='cardContainer' style={{ flex: '1'}}>
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
        <div>
          <a href='/profile'>
              <Button primary>
                <Icon name='user'></Icon>
              </Button>
            </a>
            <a href='/messages'>
              <Button secondary>
                <Icon name='rocketchat'></Icon>
              </Button>
            </a>
        </div>

      </div>
      <div className='userContentContainer' style={{ flex: '3', border: 'black 1px solid', }}>
        <h1>Chat messages</h1>
        <UserChat></UserChat>

      </div>
    </div>
  );
};

export default ProfileChat