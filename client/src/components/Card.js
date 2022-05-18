import React, { useState } from 'react';
import { Button, Card, Icon, Image, Label, Progress } from 'semantic-ui-react';
import CreateModal from './CreateModal';
import { useLocation } from 'react-router-dom';
import '../component.css';
import moment from 'moment';

const CardItem = ({ data, handleClick }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function isInTheFuture(date) {
    const today = new Date();
    

    // 👇️ OPTIONAL!
    // This line sets the time of the current date to the
    // last millisecond, so the comparison returns `true` only if
    // date is at least tomorrow
    today.setHours(23, 59, 59, 998);

    return date > today;
  }
  const colors = ['#e8f6fd', '#ecf1fd', '#fdefe8'];
  console.log('dataImage', data.image);
  const tomorrow = new Date(data.deadlineDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const getProfilePicture = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <>
      <div class="containerTest">
        <div class="card" style={{ cursor: 'pointer' }} onClick={() => handleClick(data._id)}>
          <div class="card-header">
            <img src={data.image} alt="rover" />
          </div>

          <div className="card-body3">
            <h3>{data.title}</h3>
            {isInTheFuture(tomorrow) ? (
              <div size="tiny" className="card-label" style={{ marginLeft: 'auto' }}>
                active
              </div>
            ) : (
              <div size="tiny" className="card-label2" style={{ marginLeft: 'auto' }}>
                expired
              </div>
            )}
          </div>

          <div className="card-body">
            <p>
              {data.description.substring(0, 50) + '...'}{' '}
              <a style={{ background: 'white' }}>read more</a>
            </p>

            {/* <div class="user">
              <img src={getProfilePicture.image} alt="user" />
              <div class="user-info">
                <h5>{data.name}</h5>
                <small>{moment(data.date).fromNow()}</small>
              </div> */}
            {/* </div> */}
          </div>
          <Progress
            // indicating
            color="teal"
            percent={
              data.currentAmount ? Math.floor((data.currentAmount / data.targetAmount) * 100) : 0
            }
            progress
            style={{ margin: '1rem' }}
            // content="Raised"
          />
          <div style={{ marginLeft: '1rem', display: 'flex', gap: '.5rem' }}>
            {data.categories.map((item, index) => (
              <i style={{ padding: '.1rem .5rem', background: `${colors[index]}` }}>{item}</i>
            ))}
            {/* <Label color="pink" size="tiny"></Label> */}
          </div>
          {/* <Progress
            indicating
            color="purple"
            percent={
              data.currentAmount
                ? Math.floor((data.currentAmount / data.targetAmount) * 100)
                : 0
            }
            progress
            style={{ margin: '0 2rem 2rem 2rem', height: '2rem' }}
            content="Raised"
          /> */}
        </div>
      </div>
    </>
  );
};

export default CardItem;
