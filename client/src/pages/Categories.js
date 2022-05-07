
import React, { useState } from 'react';
import { Segment, Form, Button, Container, Grid, Label, Icon } from 'semantic-ui-react';

const Categories = () => {
  return (
    <Grid style={{ height: '100vh' }}>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid style={{ width: '20rem' }}>
          <h1>Select your categories</h1>
          <Grid.Row>
            <Label as="a" color="teal" style={{ width: '100%', textAlign: 'center' }}>
              <Icon name="mail" />
              Mail
            </Label>
          </Grid.Row>
          <Grid.Row>
            <Label as="a" style={{ width: '100%', textAlign: 'center' }}>
              Tag
              <Icon name="delete" />
            </Label>
          </Grid.Row>
          <Grid.Row>
            <Label as="a" style={{ width: '100%', textAlign: 'center' }}>
              Tag
              <Icon name="delete" />
            </Label>
          </Grid.Row>
          <Grid.Row>
            <Label as="a" style={{ width: '100%', textAlign: 'center' }}>
              Tag
              <Icon name="delete" />
            </Label>
          </Grid.Row>
          <Grid.Row>
            <Label as="a" style={{ width: '100%', textAlign: 'center' }}>
              Tag
              <Icon name="delete" />
            </Label>
          </Grid.Row>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Categories;
