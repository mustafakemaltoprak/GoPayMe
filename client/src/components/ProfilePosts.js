import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';

const ProfilePosts = () => {
  const location = useLocation();
  const url = location.pathname.split('/').slice(-1)[0];
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUserCreatedFundraisers(url).then((response) => setData(response));
  }, [url]);
  return (
    <>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Target</Table.HeaderCell>
            <Table.HeaderCell>Target</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {data.length > 0 && (
          <Table.Body>
            {data.map((item) => (
              <Table.Row>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>{moment(item?.createdAt).fromNow()}</Table.Cell>
                <Table.Cell>{item.currentAmount}</Table.Cell>
                <Table.Cell>{item.targetAmount}</Table.Cell>
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
            border: 'solid 2px red',
          }}
        >
          <p>This user hasnt created any fundraisers yet</p>
        </div>
      )}
    </>
  );
};

export default ProfilePosts;
