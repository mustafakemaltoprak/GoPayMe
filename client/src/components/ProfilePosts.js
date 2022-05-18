import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Progress, Table } from 'semantic-ui-react';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';
import CreateModal from './CreateModal';
import { useHistory } from 'react-router-dom';

const ProfilePosts = ({ dataProp }) => {
  const location = useLocation();
  const url = location.pathname.split('/').slice(-1)[0];
  const { loginSuccess } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
 const history = useHistory();

  useEffect(() => {
    fetchUserCreatedFundraisers(url).then((response) => setData(response));
  }, [url]);

  return (
    <>
      <Table celled fixed singleLine textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h4>Fundraiser</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>Status</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>Progress</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>Current Amount</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>Target Amount</h4>
            </Table.HeaderCell>
            {/* {dataProp && <Table.HeaderCell>Edit</Table.HeaderCell>} */}
          </Table.Row>
        </Table.Header>

        {data.length > 0 && (
          <Table.Body>
            {data.map((item) => (
              <Table.Row>
                {/* <Table.Cell>{item.title}</Table.Cell> */}
                <Table.Cell>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => history.push(`/fundraiser/${item._id}`)}
                  >
                    {item.title}
                  </div>
                </Table.Cell>
                <Table.Cell
                  warning={
                    Math.floor(
                      (Date.parse(item.deadlineDate) - Date.parse(new Date())) / 86400000,
                    ) < 1
                  }
                  positive={
                    Math.floor(
                      (Date.parse(item.deadlineDate) - Date.parse(new Date())) / 86400000,
                    ) > 0
                    // true
                  }
                >
                  {Math.floor((Date.parse(item.deadlineDate) - Date.parse(new Date())) / 86400000) <
                  1
                    ? 'Expired'
                    : 'Active'}
                </Table.Cell>
                {/* <Table.Cell>{moment(item?.createdAt).fromNow()}</Table.Cell> */}
                <Table.Cell>
                  {' '}
                  <Progress
                    indicating
                    color="purple"
                    percent={
                      item.currentAmount
                        ? Math.floor((item.currentAmount / item.targetAmount) * 100)
                        : 0
                    }
                    progress
                    // style={{ margin: '1rem 2rem 2rem 2rem', height: '2rem' }}
                  />
                </Table.Cell>
                <Table.Cell>{item.currentAmount}</Table.Cell>
                <Table.Cell>{item.targetAmount}</Table.Cell>
                {/* {dataProp && (
                  <Table.Cell>
                    <Icon name="edit" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} />{' '}
                    Edit
                  </Table.Cell>
                )}
                {open && <CreateModal open={open} setOpen={setOpen} editData={item} />} */}
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>

      {data.length < 1 && (
        <div
          style={{
            display: 'flex',
            padding: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            // border: 'solid 2px red',
          }}
        >
          <div style={{ color: 'gray', fontSize: 20 }}>
            This user hasnt created any fundraisers yet
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePosts;
