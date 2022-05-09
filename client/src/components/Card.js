import React from 'react';
import { Card, Icon, Image, Progress } from 'semantic-ui-react';

const CardItem = ({ data }) => {
  return (
    <div>
      {data !== {} && (
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{data.name}</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>{data.description?.substring(1, 20) + '...'}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              <Progress
              color='blue'
                percent={
                  70
                }
              />
            </a>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default CardItem;

