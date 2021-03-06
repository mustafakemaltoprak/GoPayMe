import React, { useState } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import CardItem from '../components/Card';
import CreateModal from '../components/CreateModal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProfilePosts from '../components/ProfilePosts';
import { fetchUserCreatedFundraisers } from '../services/fundraisers-services';
import FundraiserTable from '../components/FundraiserTable';

import { motion }from 'framer-motion';

const Myfundraisers = () => {
  const [openModal, setOpenModal] = useState(false);
  const { fundraisers } = useSelector((state) => state.fundraiser);
  const { loginSuccess } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
   const [editData, setEditData] = useState([]);

  console.log('data', loginSuccess);
  // useEffect(() => {
  //   if (fundraisers.length > 0) {
  //     console.log('useffect ran fired');
  //     const filteredFundraisers = fundraisers.filter((item) => item.writer === loginSuccess.userId);
  //     setData(filteredFundraisers);
  //     setEditData(filteredFundraisers);
  //   }
  // }, [fundraisers, loginSuccess]);

  useEffect(() => {
    fetchUserCreatedFundraisers(loginSuccess.userId).then((response) => setData(response));
  }, []);

  // console.log('loginsucesss', loginSuccess.userId, fundraisers[1].writer);
  console.log('dataefewfe', data);

  return (
   <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
      <div style={{ minHeight: '80vh' }}>
        <Grid.Row>
          {openModal && <CreateModal open={openModal} setOpen={setOpenModal} setData={setData} />}
        </Grid.Row>
        <Grid.Row style={{ display: 'block' }}>
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            floated="right"
            style={{marginBottom: '1rem'}}
          >
            Create a fundraiser
          </Button>
        </Grid.Row>

        <div
          attached="bottom"
          style={{ padding: '2rem', marginTop: '3rem' }}
          // className="cardgrid"
        >
          {data.length > 0 ? (
            // <ProfilePosts dataProp={data} setDataProp={setData} setEditData={setEditData} />
            <FundraiserTable setData={setData} data={data}/>
          ) : (
            // data.map((dataItem) => <CardItem data={dataItem} />)
            <p>You havent published any data yet</p>
          )}

          {/* // } */}
        </div>
      </div>
    </motion.div>
  );
};

export default Myfundraisers;
