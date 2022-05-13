import React from 'react'
import moment from 'moment';

const Message = ({msg, senderName, msgTime}) => {
console.log('just checking', msg, senderName, msgTime);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '.1rem', marginBottom: '.5rem', background: 'gainsboro', color: 'black', border: '1px solid red' }} >
      <p style={{ marginBottom: '0.5rem' }}>{msg}</p>
      <div style={{ display: 'flex' }}>
        <p style={{ marginRight: '0.5rem' }}>{senderName}</p>
         <p>{ moment(msgTime).fromNow()}</p>
      </div>
    </div>
  );
}

export default Message