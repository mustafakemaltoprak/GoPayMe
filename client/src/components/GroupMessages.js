import React, { useState, useEffect, useRef } from 'react';

import { Grid, Button, Input, Image, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { createMessage, fetchAllConversations, fetchMessages } from '../services/messages';
import Message from './Message';

const GroupMessages = () => {
  const scrollRef = useRef();
  const { loginSuccess } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [contactNames, setContactNames] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // const [contactNames, setContactNames] = useState([]);
  const [allCurrentMessages, setAllCurrentMessages] = useState({});
  // const [allCurrentMessages, setAllCurrentMessages] = useState({});
  useEffect(() => {
    fetchAllConversations().then((response) =>
      setContactNames(
        response.map((convo) => {
          const name = convo.members.find((member) => member._id !== loginSuccess._id).name;
          const id = convo.members.find((member) => member._id !== loginSuccess._id)._id;

          return { name, id };
        }),
      ),
    );
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [newMessage]);

  const handleFetch = async (id) => {
    console.log('idddd', IDBDatabase);
    const msg = await fetchMessages(id).then((response) => {
      console.log('fresh data', response);
      setAllCurrentMessages(response);
    });
    console.log('the msgs', msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otherUser = allCurrentMessages.members.find((member) => member._id !== loginSuccess._id);

    const payload = {
      members: [loginSuccess._id, otherUser._id],
      user: loginSuccess._id,
      chats: {
        messages: {
          msg: message,
          sender: loginSuccess._id,
          receiver: otherUser._id,
          date: new Date().toISOString(),
        },
      },
    };

    const response = await createMessage(payload);
    if(response){
      const newMsg = response.chats.messages.pop();
       setNewMessage(newMsg);

        setAllCurrentMessages((previousMessages) => {
          return {
            ...previousMessages,
            chats: {
              messages: [...previousMessages.chats.messages, newMsg],
            },
          };
        });

    }
    setMessage('')
  };

  console.log('all current', allCurrentMessages );
  return (
    <Grid columns={2} divided style={{marginTop: '1.5rem'}}>
      <Grid.Row>
        <Grid.Column width={5} style={{ border: '5px solid gainsboro', overflow: 'hidden', borderRadius: '15px' }}>
          {contactNames.length > 0 && (
            <div
              style={{
                overflowY: 'auto',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  paddingTop: '1rem',
                }}
              >
                <strong>Latest messages</strong>
              </p>
              {contactNames.map((contact, index) => (
                <Segment
                  style={{ cursor: 'pointer' }}
                  className="contactName"
                  onClick={() => handleFetch(contact.id)}
                  key={index}
                >
                  {contact.name}
                </Segment>
              ))}
            </div>
          )}
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
                  src={
                    allCurrentMessages.members?.find((member) => member._id !== loginSuccess._id)
                      .image
                  }
                />
                Send{' '}
                {allCurrentMessages.members?.find((member) => member._id !== loginSuccess._id).name}{' '}
                a message
              </h3>
            </div>
            {Object.keys(allCurrentMessages).length < 1 ? (
              <div
                style={{
                  height: '85%',
                  // border: '2px solid red',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: 'gray',
                  padding: '1rem',
                  overflow: 'hidden',
                }}
              >

              <div style={{fontSize: '2rem'}}>Click a contact to continue a conversation</div>
              </div>
            ) : (
              <div
                style={{
                  height: '85%',
                  // border: '2px solid red',
                  display: 'flex',
                  // alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                  padding: '1rem',
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    overflow: 'auto',
                  }}
                >
                  {allCurrentMessages?.chats?.messages?.length > 0 &&
                    allCurrentMessages?.chats?.messages.map((msg, index) => (
                      // <div style={{ border: '2px green solid' }}>
                      <div
                      key={index}
                        ref={scrollRef}
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
                              ? allCurrentMessages.members.find(
                                  (member) => member._id === msg.sender,
                                )
                              : allCurrentMessages.members.find(
                                  (member) => member._id !== msg.sender,
                                )
                          }
                          msgTime={msg.date}
                          // style={true && 'flex-start'}
                          style={msg.sender === loginSuccess._id ? 'flex-end' : 'flex-start'}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  height: '10%',
                  // border: '2px solid red',
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
