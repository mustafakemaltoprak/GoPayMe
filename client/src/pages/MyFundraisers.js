import React, {useState} from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import CardItem from '../components/Card';
import CreateModal from '../components/CreateModal';

const Myfundraisers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});

  console.log('data', data)
  return (
    <div style={{border: 'red solid 1px', minHeight: '80vh'}}>
      <Grid.Row>
        {openModal && <CreateModal open={openModal} setOpen={setOpenModal} setData={setData} />}
      </Grid.Row>
      <Grid.Row>
        <h1>Active Fundraisers</h1>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          
          Create a fundraiser
        </Button>
      </Grid.Row>

      <Grid.Row>
        <CreateModal />
      </Grid.Row>

      <Grid.Row>
        {data !== true && <CardItem data={data} />}
      </Grid.Row>
    </div>
  );
};

export default Myfundraisers;
