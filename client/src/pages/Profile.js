import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card, Icon, Image, Button, Popup, TextArea, List, Input, Menu } from 'semantic-ui-react';
import Message from '../components/Message';
import ProfilePosts from '../components/ProfilePosts';
import { createMessage, fetchMessages } from '../services/messages';
import { createNotification, fetchUserDetails } from '../services/user-services';
// import UserChat from '../components/UserChat';
// import UserDetails from '../components/UserDetails';
import { motion }from 'framer-motion';

function Profile() {
  const location = useLocation();
  const scrollRef = useRef();
  const { loginSuccess } = useSelector((state) => state.user);
  const [textValue, setTextValue] = useState('');
  const [allMessages, setAllMessages] = useState({});
  const [requestSent, setRequestSent] = useState(false);

  const [detailsData, setDetailsData] = useState({});
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [justMessages, setJustMessages] = useState([]);

  const url = location.pathname.split('/').slice(-1)[0];

  const [currentPage, setCurrentPage] = useState({
    BasicProfile: true,
    ProfilePosts: false,
  });

  useEffect(() => {
    fetchUserDetails(url).then((response) => setDetailsData(response));
  }, [url]);

  console.log('IDDDD', detailsData);
  useEffect(() => {
    
    if (detailsData)
      fetchMessages(detailsData._id).then((response) => {
        console.log('fresh data', response);
        setAllMessages(response);
      });
  }, [detailsData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [newMessage]);

  console.log('messages were fetched', allMessages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      members: [loginSuccess._id, detailsData._id],
      user: loginSuccess._id,
      chats: {
        messages: {
          msg: message,
          sender: loginSuccess._id,
          receiver: detailsData._id,
          date: new Date().toISOString(),
        },
      },
    };

    console.log('payload', payload);
    const response = await createMessage(payload);
    const notificationPayload = {
      typeof: 'message',
      targetUser: detailsData.userId,
      note: '',
    };

    await createNotification(notificationPayload);

    console.log('the response', response);

    if (response && Object.keys(allMessages).length === 0) {
      //if first message
      console.log('inner', allMessages);
      setAllMessages(response);
      setNewMessage(response);
      setMessage('');
      return;
    }

    if (response) {
      console.log('outer', allMessages);
      //if first message
      const newMsg = response.chats.messages.pop();
      console.log('mnee messs', allMessages);
      setNewMessage(newMsg);
      // console.log('all', allMessages, 'fefefe',allMessages.messages);
      setAllMessages((previousMessages) => {
        return {
          ...previousMessages,
          chats: {
            messages: [...previousMessages.chats.messages, newMsg],
          },
        };
      });
    }

    // {
    //   ...previousMessages,
    //   chats: { messages: [...previousMessages.chats.messages, newMsg] },
    // });
    // setAllMessages((previous) => {
    //   return { ...previous, chats: { messages: [...previous.messages.chats, newMsg] } };
    // });

    // [...previous[0].chats.messages]
    //   members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // user: { type: Schema.Types.ObjectId, ref: 'User' },
    // chats: {
    //   messages: [
    //     {
    //       msg: { type: String, required: true },
    //       sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //       receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //       date: { type: Date },
    //     },
    //   ],
    // },
    setMessage('');
  };

  console.log('detailsData', allMessages);

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Menu attached="top" tabular>
        <Menu.Item
          name=" Profile"
          active={currentPage['BasicProfile']}
          onClick={() => handleCurrentPage('BasicProfile')}
        />
        <Menu.Item
          name="Posts"
          active={currentPage['ProfilePosts']}
          onClick={() => handleCurrentPage('ProfilePosts')}
        />
      </Menu>
      {currentPage['BasicProfile'] && (
        <>
          <div
            className="profileContainer"
            style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}
          >
            <div
              className="cardContainer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image src={detailsData.image} size="small" circular />

              <List>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>
                    <strong>{detailsData.name}</strong>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="marker" />
                  <List.Content>New York, NY</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="mail" />
                  <List.Content>
                    <a href="mailto:jack@semantic-ui.com">
                      {detailsData.email?.substring(0, 3) + '***' + '@yahoo.com'}
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="linkify" />
                  <List.Content>
                    <a href="http://www.semantic-ui.com">semantic-ui.com</a>
                  </List.Content>
                </List.Item>
              </List>
              <div>
                {/* <Button primary>
            <Icon name="user"></Icon>
            Follow
          </Button> */}
                {loginSuccess.following.find((followerId) => followerId._id === detailsData._id) ? (
                  <Button color="red" icon="user" content="Following" />
                ) : (
                  <Popup
                    trigger={
                      <Button
                        color="red"
                        icon="user"
                        content={requestSent ? 'Request sent' : 'Follow'}
                      />
                    }
                    content={
                      <>
                        <i>Say something nice</i>
                        <TextArea
                          value={textValue}
                          onChange={(e) => setTextValue(e.target.value)}
                        />
                        <Button
                          color="blue"
                          content="Add personal note"
                          onClick={async () => {
                            const payload = {
                              typeof: 'follow',
                              targetUser: url,
                              note: textValue,
                              date: new Date().toISOString(),
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
                )}
                {/* <Button secondary>
                  <Icon name="rocketchat"></Icon>
                  Message
                </Button> */}
              </div>
            </div>
            <div
              className="userContentContainer"
              style={{
                flex: '4',
                border: 'gray 1px solid',
                marginLeft: '3rem',
                borderRadius: '45px',
                height: '40rem',
                padding: '2rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h3 style={{ textAlign: 'center', display: 'flex' }}>
                  <Image
                    circular
                    style={{ height: '2rem', marginRight: '1.5rem', padding: 0, display: 'flex' }}
                    src={detailsData.image}
                  />
                  Send {detailsData.name} a message
                </h3>
              </div>
              <div
                style={{
                  height: '85%',
                  border: '2px solid gainsboro',
                  display: 'flex',
                  // alignItems: 'flex-start',
                  // background: '#fff',
                  opacity: '0.9',
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                  padding: '1rem',
                  overflow: 'hidden',
                }}
                className="testingChatBox"
              >
                <div
                  style={{
                    overflow: 'auto',
                  }}
                >
                  {allMessages?.chats?.messages?.length > 0 &&
                    allMessages?.chats?.messages.map((msg) => (
                      // <div style={{ border: '2px green solid' }}>
                      <div
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
                            allMessages.members.find((member) => member._id === msg.sender)
                              ? allMessages.members.find((member) => member._id === msg.sender)
                              : allMessages.members.find((member) => member._id !== msg.sender)
                          }
                          msgTime={msg.date}
                          // style={true && 'flex-start'}
                          style={msg.sender === loginSuccess._id ? 'flex-end' : 'flex-start'}
                        />
                      </div>
                    ))}
                </div>
              </div>
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
                <Button className="payments-button" content="Send" type="submit" />
              </form>
            </div>
          </div>
        </>
      )}
      {currentPage['ProfilePosts'] && <ProfilePosts />}
    </motion.div>
  );
}
export default Profile;

//
