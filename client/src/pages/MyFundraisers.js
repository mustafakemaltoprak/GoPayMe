import React, { useState } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import CardItem from '../components/Card';
import CreateModal from '../components/CreateModal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Myfundraisers = () => {
  const [openModal, setOpenModal] = useState(false);
  const { fundraisers } = useSelector((state) => state.fundraiser);
  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  console.log('data', loginSuccess);
  useEffect(() => {
    if (fundraisers.length > 0) {
      console.log('fired');
      const filteredFundraisers = fundraisers.filter((item) => item.writer === loginSuccess.userId);
      setData(filteredFundraisers);
    }
  }, [fundraisers, loginSuccess]);

  // console.log('loginsucesss', loginSuccess.userId, fundraisers[1].writer);
  console.log('data', data);

  return (
    <div style={{ border: 'red solid 1px', minHeight: '80vh' }}>
      <Grid.Row>{openModal && <CreateModal open={openModal} setOpen={setOpenModal} />}</Grid.Row>
      <Grid.Row style={{ display: 'block' }}>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          floated="right"
        >
          Create a fundraiser
        </Button>
      </Grid.Row>

      <div
        attached="bottom"
        style={{ padding: '2rem', border: '1px red solid' }}
        className="cardgrid"
      >
        {data.length > 0 ? (
          data.map((dataItem) => <CardItem data={dataItem} />)
        ) : (
          <p>You havent published any data yet</p>
        )}

        {/* // } */}
      </div>
    </div>
  );
};

export default Myfundraisers;
