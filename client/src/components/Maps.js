import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import MapContainerDiv from './MapContainer';
// import { MapContainer, TileLayer } from 'react-leaflet';


const Maps = ({ data }) => {
 
  console.log('data active', data.length, 'data', data);
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={5}>
          <div>
            {data.length > 0 &&
              data.map((dataItem) => <Segment color="red">{dataItem.title}</Segment>)}
          </div>
        </Grid.Column>
        <Grid.Column width={11} style={{ border: '5px red solid' }}>
          <MapContainerDiv/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Maps;
