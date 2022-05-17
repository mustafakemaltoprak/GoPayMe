import React, { useState } from 'react';
import { Card, Icon, Image, Label, Progress } from 'semantic-ui-react';
import CreateModal from './CreateModal';
import { useLocation } from 'react-router-dom';

const CardItem = ({ data, handleClick, maps }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // <Label color="red" floating>
  //   22
  // </Label>;
  console.log('locat', data);
  return (
    <div>
      {data !== {} && (
        <div className="hover">
          <Card style={{ height: `${maps ? '10rem' : '26rem'}`, width: '15rem' }}>
            {location.pathname === '/fundraisers' ? (
              <Label color="green" floating onClick={() => setOpen(true)}>
                Edit
              </Label>
            ) : (
              <Label color="green" floating>
                Active
              </Label>
            )}
            {open && <CreateModal open={open} setOpen={setOpen} editData={data} />}
            {/* <div style={{ position: 'absolute', bottom: '200rem' }}>Name : City</div> */}
            {!maps && <Image
              src={data.image}
              wrapped
              ui={false}
              onClick={() => handleClick(data._id)}
              style={{ cursor: 'pointer' }}
            />}

            <Card.Content>
              <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{data.title}</div>
                <div style={{ display: 'flex' }}>
                  <Icon name="thumbs up" /> <p style={{ color: 'gainsboro' }}>{data.likes - 1}</p>
                </div>
              </Card.Header>
              <Card.Meta>created by: {data.writerId?.name}</Card.Meta>
              <Card.Description>{data.description?.substring(1, 20) + '...'}</Card.Description>
            </Card.Content>
            {/* <Card.Content extra style={{height: '20rem'}}> */}
            {/* <Icon name="user" size='small'/> */}
            <Progress
              color="purple"
              percent={data.currentAmount ? (data.currentAmount / data.targetAmount) * 100 : 0}
              progress
              style={{ margin: '0 2rem 2rem 2rem', height: '2rem' }}
              // content={`$${data.currentAmount} Raised`}
            >
              <p
                style={{  color: 'gray' }}
              >{`$${data.currentAmount} Raised`}</p>
            </Progress>
            {/* </Card.Content> */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default CardItem;
