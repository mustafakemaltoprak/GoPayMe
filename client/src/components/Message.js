import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

const Message = ({ msg, senderObj, msgTime, style }) => {
  // console.log('just checking', msg, senderName, msgTime);
  const { loginSuccess } = useSelector((state) => state.user);
  // style = 'flex-start'
  return (
    // <div style={{ border: '2px green solid' }}>
    // const
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1rem 0rem 1rem',
        marginBottom: '.5rem',
        // background: `${style === 'flex-end' ? 'orange' : 'gainsboro'}`,

        background: `${style === 'flex-end' ? 'orange' : 'gainsboro'}`,
        color: `${style === 'flex-end' ? 'white' : 'black'}`,

        // color: 'white',
        // width: '20rem',
        // color: 'black',
        // border: '1px solid red',
        borderRadius: '15px',
        // float: 'right',
        // marginLeft: `${style === 'flex-start' ? '3rem' : '0'}`,
        // marginRight: `${style === 'flex-start' ? '3rem' : '0'}`,
        marginLeft: `${style === 'flex-end' ? '10rem' : ''}`,
        marginRight: `${style === 'flex-start' ? '10rem' : ''}`,

        alignItems: style,
      }}
    >
      <strong
        style={{
          marginBottom: '0.2rem',
          // ,border: '1px solid green'
        }}
      >
        {msg}
      </strong>
      <div style={{ display: 'flex' }}>
        <p style={{ marginRight: '0.5rem' }}>{senderObj.name}</p>
        <p>{moment(msgTime).fromNow()}</p>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default Message;
