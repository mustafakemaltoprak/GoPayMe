import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Header, Placeholder, Popup } from 'semantic-ui-react';

const UserButton = ({ dataObj }) => {
  const [data, setData] = useState(null);
  const timer = useRef();
  const  history = useHistory()
  return (
    <Popup
      trigger={
        <Link
          to={`profile/${dataObj.writer}`}
          style={{ cursor: 'pointer' }}
          href
          onClick={() => history.push(`/${dataObj.writer}`)}
        >
          {dataObj.writerId?.name}
        </Link>
      }
      header={dataObj.writerId?.name}
      content={
        dataObj.writerId?.description ? dataObj.writerId?.description : 'Humanity is beautiful!'
      }
      on={['hover']}
    />
  );
};

export default UserButton;
