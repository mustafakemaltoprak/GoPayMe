import React, {useState} from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import CreateModal from '../components/CreateModal';

const Profile = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Grid>
      <Grid.Row>
        {openModal && <CreateModal open={openModal} setOpen={setOpenModal}/>}
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
    </Grid>
  );
};

export default Profile;
