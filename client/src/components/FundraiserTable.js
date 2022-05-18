import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Progress, Table } from 'semantic-ui-react';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';
import { useHistory } from 'react-router-dom';
import CreateModal from './CreateModal';

const FundraiserTable = ({ data, setData }) => {
  // const location = useLocation();
const history = useHistory();
  const { loginSuccess } = useSelector((state) => state.user);

  // const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   fetchUserCreatedFundraisers(loginSuccess.userId).then((response) => setData(response));
  // }, []);

  return (
    <>
      <Table celled fixed singleLine textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fundraiser</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Progress</Table.HeaderCell>
            <Table.HeaderCell>Current Amount</Table.HeaderCell>
            <Table.HeaderCell>Target Amount</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
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
                <Table.Cell>
                  <Icon name="edit" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} />{' '}
                  Edit
                </Table.Cell>
                {open && (
                  <CreateModal open={open} setOpen={setOpen} editData={item} setEdit={setData} />
                )}
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
          <p>This user hasnt created any fundraisers yet</p>
        </div>
      )}
    </>
  );
};

export default FundraiserTable;
