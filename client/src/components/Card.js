import React from 'react';
import { Card, Icon, Image, Progress } from 'semantic-ui-react';

const CardItem = ({ data }) => {
  return (
    <Card>
      <Image src={data.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{data.name}</Card.Header>
        <Card.Meta>Joined in 2016</Card.Meta>
        <Card.Description>{data.description.sunstring(1, 20) + '...'}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          <Progress
            percent={
              data.currentAmount > 0 ? (data.data.currentAmount / data.targetAmount) * 100 : 0
            }
          />
        </a>
      </Card.Content>
    </Card>
  );
};

export default CardItem;

const images = [
  'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
  'https://react.semantic-ui.com/images/avatar/large/matthew.png',
  'https://react.semantic-ui.com/images/avatar/large/chris.jpg',
  'https://react.semantic-ui.com/images/wireframe/square-image.png',
];
