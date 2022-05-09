import React from 'react';
import { Card, Icon, Image, Label, Progress } from 'semantic-ui-react';

const CardItem = ({ data }) => {
  // <Label color="red" floating>
  //   22
  // </Label>;
  return (
    <div>
      {data !== {} && (
        <div>
          <Card style={{ height: '20rem', width: '13rem' }}>
            <Label color="green" floating>
              active
            </Label>

            <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            wrapped
            ui={false}
          />
            <Card.Content>
              <Card.Header>{data.title}</Card.Header>
              <Card.Meta>created: days ago</Card.Meta>
              <Card.Description>{data.description?.substring(1, 20) + '...'}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              {/* <Icon name="user" size='small'/> */}
              <Progress
                color="purple"
                percent={data.currentAmount ? (data.currentAmount / data.targetAmount) * 100 : 0}
                progress
                content="Raised"
              />
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CardItem;
