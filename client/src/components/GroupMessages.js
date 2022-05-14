import React from 'react';
import { useEffect } from 'react';
import { Grid, Button, Input, Image,Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { fetchAllConversations, fetchMessages } from '../services/messages';
import Message from './Message';
import { useState } from 'react';

const GroupMessages = () => {
  const { loginSuccess } = useSelector((state) => state.user);
  const [contactNames, setContactNames] = useState([]);
   const [allCurrentMessages, setAllCurrentMessages] = useState({});
  useEffect(() => {
    fetchAllConversations().then((response) =>
      setContactNames(
        response.map(
          (convo) => {
          const name =  convo.members.find((member) => member._id !== loginSuccess._id).name
           const id =  convo.members.find((member) => member._id !== loginSuccess._id)._id

           return {name , id}
          }
        )
      ),
    );
  }, []);

  const handleFetch = async(id) => {
    console.log('idddd', IDBDatabase)
    const msg = await fetchMessages(id).then((response) => {
      console.log('fresh data', response);
      setAllCurrentMessages(response);
    }); 
    console.log('the msgs', msg)

  }

  console.log('group page', contactNames);
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={5} style={{ border: '1px solid red' }}>
          {contactNames.length > 0 &&
            contactNames.map((contact) => (
              <Segment style={{ cursor: 'pointer' }} onClick={() => handleFetch(contact.id)}>
                {contact.name}
              </Segment>
            ))}
        </Grid.Column>
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
                justifyContent: 'flex-end',
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
                {allCurrentMessages?.chats?.messages?.length > 0 &&
                  allCurrentMessages?.chats?.messages.map((msg) => (
                    // <div style={{ border: '2px green solid' }}>
                    <div
                      // ref={scrollRef}
                      style={{
                        display: 'block',

                        // flexDirection: 'column',
                        // padding: '.1rem',
                        // marginBottom: '.5rem',
                        // background: 'gainsboro',
                        // color: 'black',
                        // border: '5px solid purple',
                        // float: 'right',
                        // marginRight: 'auto',
                      }}
                    >
                      <Message
                        msg={msg.msg}
                        senderObj={
                          allCurrentMessages.members.find((member) => member._id === msg.sender)
                            ? allCurrentMessages.members.find((member) => member._id === msg.sender)
                            : allCurrentMessages.members.find((member) => member._id !== msg.sender)
                        }
                        msgTime={msg.date}
                        // style={true && 'flex-start'}
                        style={msg.sender === loginSuccess._id ? 'flex-end' : 'flex-start'}
                      />
                    </div>
                  ))}
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
