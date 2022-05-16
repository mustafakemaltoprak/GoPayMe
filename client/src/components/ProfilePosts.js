import React from 'react'
import { useLocation } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const ProfilePosts = () => {
   const location = useLocation();
   const url = location.pathname.split('/').slice(-1)[0];


  //  useEffect(() => {
  //    if (fundraisers.length > 0) {
  //      console.log('fired');
  //      const filteredFundraisers = fundraisers.filter(
  //        (item) => item.writer === loginSuccess.userId,
  //      );
  //      setData(filteredFundraisers);
  //    }
  //  }, [fundraisers, loginSuccess]);
  return (
    <Table celled fixed singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Amount Raised</Table.HeaderCell>
          <Table.HeaderCell>Target</Table.HeaderCell>
          <Table.HeaderCell>Target</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Table.Cell>
          <Table.Cell>400</Table.Cell>
          <Table.Cell>1000</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell>Shorter description</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill</Table.Cell>
          <Table.Cell>Denied</Table.Cell>
          <Table.Cell>Shorter description</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default ProfilePosts