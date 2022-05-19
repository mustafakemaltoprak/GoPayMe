import React, { useRef, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import MapContainerDiv from './MapContainer';
// import { MapContainer, TileLayer } from 'react-leaflet';

const Maps = ({ data }) => {
  let mapRef = useRef(null);
  let markerRef = useRef(null);

  const onClickShowMarker = (markerLocation) => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    map.flyTo(markerLocation, 13);
    const marker = markerRef.current;
    if (marker) {
      marker.openPopup();
    }
  };

  console.log('data active', data.length, 'data', data);
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={5}>
          <div>
            {data.length > 0 &&
              data
                .filter((item) => !!item.location)
                .map((dataItem) => (
                  <Segment
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onClickShowMarker(dataItem.location.coordinates)}
                  >
                    {dataItem.title}
                  </Segment>
                ))}
          </div>
        </Grid.Column>
        <Grid.Column width={11} style={{ border: '5px red solid' }}>
          <MapContainerDiv
            data={data.filter((item) => !!item.location)}
            markerRef={markerRef}
            mapRef={mapRef}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Maps;