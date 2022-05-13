import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import moment from 'moment';

//chat import



function UserChat() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const userFrom = 'myFan';//'from userName localStorage'
  const userTo = 'destinationUser';//'from userName localStorage'

  const submitHandler = (formObj) => {
    formObj.preventDefault();
    //obj to be sent to DB
    const content = formObj.target.messageBody.value;

    const newMessage = {content, userFrom, userTo};
    console.log('New message: ', newMessage);

    setMessage(newMessage);
    setAllMessages(prevMsg => [...prevMsg, newMessage]);

    console.log('allMessages', allMessages);
    formObj.target.reset();
  }

  return (
    <div className='chatBoxContainer' style={{ boxSizing: 'border-box' }}>
      <div className='conversationContainer'>
        <h3>Messages</h3>
        <ul>
          {allMessages.map((msg, index) => {
            return <li key={index}>
              <h5>{msg.content}</h5>
            </li>
          })}
        </ul>
      </div>
      <div className='inputMessageContainer'>
        <form onSubmit={submitHandler} style={{ position: 'absolute', bottom: '0'}}>
          <input className='formMessage' type='text' name='messageBody' placeholder='Write your message here...' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UserChat