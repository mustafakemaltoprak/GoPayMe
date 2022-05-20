import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { CategoriesList } from '../components/CategoriesList';
import { motion }from 'framer-motion';

const Categories = () => {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid style={{ height: '100vh' }}>
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid style={{ width: '20rem' }}>
            <CategoriesList></CategoriesList>
          </Grid>
        </Container>
      </Grid>
    </motion.div>
  );
};

export default Categories;
