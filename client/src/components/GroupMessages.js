import React from 'react';
import { Grid, Button, Input, Image } from 'semantic-ui-react';
import Message from './Message';

const GroupMessages = () => {
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={5} style={{ border: '1px solid red' }}></Grid.Column>
        <Grid.Column width={11}>
          <div
            className="userContentContainer"
            style={{
              flex: '4',
              border: 'black 1px solid',
              // margin: '1em',
              borderRadius: '15px',
              height: '40rem',
              padding: '2rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h3 style={{ textAlign: 'center', display: 'flex' }}>
                <Image
                  circular
                  style={{ height: '2rem', marginRight: '1.5rem', padding: 0, display: 'flex' }}
                  src={'detailsData.image'}
                />
                Send {'detailsData.name'} a message
              </h3>
            </div>
            <div
              style={{
                height: '85%',
                border: '2px solid red',
                display: 'flex',
                // alignItems: 'flex-start',
                // justifyContent: 'flex-end',
                flexDirection: 'column',
                padding: '1rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  overflow: 'auto',
                }}
              >
                
              </div>
            </div>
            <form
              style={{ display: 'flex' }}
              // onSubmit={handleSubmit}
            >
              <Input
                // value={message}
                // onChange={(e) => setMessage(e.target.value)}
                style={{
                  height: '10%',
                  border: '2px solid red',
                  width: '100%',
                  // display: 'flex',
                  // flexDirection: 'row-reverse',
                  marginRight: 'auto',
                }}
              />
              <Button content="Send" type="submit" />
            </form>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GroupMessages;
