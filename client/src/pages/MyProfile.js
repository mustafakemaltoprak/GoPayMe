import React, { useState } from 'react';
import { Button, Grid, Label, Menu, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import {  notificationRespond } from '../services/user-services';
import { updateUserDetails } from '../redux/actions/userActions';

const MyProfile = () => {
  const { loginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState({
    Account: true,
    Requests: false,
    Messages: false,
  });

  const [currentNote, setCurrentNote] = useState('');

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
    <>
      {/* <Grid>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <div><</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div style={{ display: 'grid', gridTemplateAreas: '1fr 1fr 1fr' }}>
        {data.length > 0 && data.map((dataItem) => <CardItem data={dataItem} key={dataItem._id} />)}
      </div> */}
      <Menu attached="top" tabular>
        <Menu.Item
          name="Account"
          active={currentPage['Account']}
          onClick={() => handleCurrentPage('Account')}
        />
        <Menu.Item
          name="Requests"
          active={currentPage['Requests']}
          onClick={() => handleCurrentPage('Requests')}
        />
        <Menu.Item
          name="Messages"
          active={currentPage['Messages']}
          onClick={() => handleCurrentPage('Messages')}
          // onClick={this.handleItemClick}
        />
      </Menu>

      {currentPage['Account'] && (
        <>
          <div
            attached="bottom"
            style={{ paddingTop: '2rem', border: '1px red solid' }}
            className="cardgrid"
          ></div>
        </>
      )}

      {currentPage['Requests'] && (
        <>
          {/* <div
            attached="bottom"
            style={{ padding: '2rem', border: '4px red solid' }}
            className="cardgrid"
          > */}
          <Grid
            columns={2}
            divided
            attached="bottom"
            style={{ padding: '2rem', border: '4px red solid' }}
            className="cardgrid"
          >
            <Grid.Row>
              <Grid.Column width={4}>
                {/* {loginSuccess.notifications.length < 0 ? <} */}
                {loginSuccess.notifications.length > 0 &&
                  loginSuccess.notifications.map((item) => (
                    <Segment vertical>
                      <div>
                        Follow Request from <strong>{item.senderName}</strong>
                        <Label onClick={() => setCurrentNote(item.note)}>View Note</Label>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <Button
                          circular
                          content="accept"
                          color="blue"
                          onClick={async () => {
                            const payload = {
                              senderId: item.senderId,
                              response: 'accept',
                              typeof: 'follow'
                            };
                            const response = await notificationRespond(payload);
                            if (response) dispatch(updateUserDetails(response));
                          }}
                        />
                        <Button
                          circular
                          content="reject"
                          color="red"
                          onClick={async () => {
                            const payload = {
                              senderId: item.senderId,
                              response: 'reject',
                              typeof: 'follow',
                            };
                            await notificationRespond(payload);
                          }}
                        />
                      </div>
                    </Segment>
                  ))}
              </Grid.Column>
              <Grid.Column width={12}>
                {loginSuccess.notifications.length < 1 ? (
                  <p>You have no notifications</p>
                ) : (
                  <p>{currentNote}</p>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default MyProfile;
