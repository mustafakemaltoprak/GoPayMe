import React, { useState } from 'react';
import { Segment, Form, Button, Container, Grid, Label, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { postCategories } from '../services/user-services';
import { useHistory } from 'react-router-dom';

import { motion }from 'framer-motion';

const Categories = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [categories, setCategories] = useState({
    charity: false,
    healthcare: false,
    art: false,
    humanitarian: false,
    animals: false,
  });

  const handleClick = (arg) => {
    // setCategories(prev => {...prev, egef: !categories[arg]})
    setCategories((prev) => {
      return { ...prev, [arg]: !categories[arg] };
    });
  };

  const handleSubmit = async () => {
    let categoriesArr = [];
    for (let key in categories) {
      if (categories[key]) {
        categoriesArr.push(key);
      }
    }

    console.log('ARRAYY', categoriesArr);

    if (await postCategories({ categories: categoriesArr, userId: user.loginSuccess.userId })) {
      history.push('/home');
    }
  };

  return (
    // motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid style={{ height: '100vh' }}>
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid style={{ width: '20rem' }}>
            <h1>Select your categories</h1>
            <Grid.Row>
              <Label
                as="a"
                color={categories['charity'] && 'teal'}
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => handleClick('charity')}
              >
                
                Charity <Icon name="delete" />
              </Label>
            </Grid.Row>
            <Grid.Row style={{ padding: '0' }}>
              <Label
                as="a"
                color={categories['healthcare'] && 'teal'}
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => handleClick('healthcare')}
              >
                Healthcare
                <Icon name="delete" />
              </Label>
            </Grid.Row>
            <Grid.Row>
              <Label
                as="a"
                color={categories['art'] && 'teal'}
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => handleClick('art')}
              >
                Art
                <Icon name="delete" />
              </Label>
            </Grid.Row>
            <Grid.Row style={{ padding: '0' }}>
              <Label
                as="a"
                color={categories['humanitarian'] && 'teal'}
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => handleClick('humanitarian')}
              >
                Humanitarian
                <Icon name="delete" />
              </Label>
            </Grid.Row>
            <Grid.Row>
              <Label
                as="a"
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => handleClick('animals')}
                color={categories['animals'] && 'teal'}
              >
                Animals
                <Icon name="delete" />
              </Label>
            </Grid.Row>
            <Grid.Row>
              <Button
                color="blue"
                style={{ width: '100%', textAlign: 'center' }}
                onClick={handleSubmit}
              >
                Confirm
              </Button>
            </Grid.Row>
          </Grid>
        </Container>
      </Grid>
    </motion.div>
  );
};

export default Categories;
