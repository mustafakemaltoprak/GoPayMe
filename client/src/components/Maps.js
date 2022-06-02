import React, { useRef, useState } from 'react';
import { Grid, Progress, Segment } from 'semantic-ui-react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, useMap, Popup } from 'react-leaflet';
import CardItem from './Card';


const Maps = ({ data }) => {
  data = data.filter((item) => !!item.location);


  const dataCoords = data.map(
    (place) => [place.location.coordinates[1],
    place.location.coordinates[0]],
  );

  const [locations, setLocations] = useState(data);
  const [center, setCenter] = useState([51.505, -0.091]);
  const [zoom, setZoom] = useState(11);
  const [marker, setMarker] = useState(null);

  const markerRefs = [];

  const handlePopup = (marker, id) => {};

  const handleClick = (id, coordinatesArr) => {
    setZoom(11);
    setCenter(coordinatesArr);
    
  };
  const colors = [
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
  ];
  

  
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={5}>
          <div>
            {data.length > 0 &&
              data
                .filter((item) => !!item.location)
                .map((dataItem, index) => (
                  <Segment
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    style={{ cursor: 'pointer' }}
                    className="map-card"
                   
                    onClick={() =>
                      handleClick(index, [
                        dataItem.location.coordinates[1],
                        dataItem.location.coordinates[0],
                      ])
                    }
                  >
                    {dataItem.title}
                  </Segment>
                ))}
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          
          <MapContainer
            bounds={L.latLngBounds(dataCoords)}
            center={center}
            
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((place, index) => (
              <Marker
                
                ref={(ref) => {
                  markerRefs[index] = ref;
                 
                }}
                key={place.id}
                position={[place.location.coordinates[1], place.location.coordinates[0]]}
              
              >
                <Popup>
                  <CardItem data={place} maps={true} />
                </Popup>
              </Marker>
            ))}
            
          </MapContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Maps;
