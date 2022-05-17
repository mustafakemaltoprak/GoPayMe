import React, { useRef, useState } from 'react';
import { Grid, Progress, Segment } from 'semantic-ui-react';
import MapContainerDiv from './MapContainer';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip, useMap, Popup } from 'react-leaflet';
import CardItem from './Card';
// import { MapContainer, TileLayer } from 'react-leaflet';

const Maps = ({ data }) => {
  data = data.filter((item) => !!item.location);
  console.log('ddddddd', data);

  const dataCoords = data.map((place)=> place.location.coordinates)

   console.log('ddegegegd', dataCoords);


  //  const onClickShowMarker = (params) => {
  //    const map = mapRef.current;
  //    if (!map) {
  //      return;
  //    }
  //    map.flyTo(MARKER_POSITION, 13);
  //    const marker = markerRef.current;
  //    if (marker) {
  //      marker.openPopup();
  //    }
  //  }
  const [locations, setLocations] = useState(data);
  const [center, setCenter] = useState([51.505, -0.091]);
  const [zoom, setZoom] = useState(11);
  const [marker, setMarker] = useState(null);

  const markerRefs = [];

  const handlePopup = (marker, id) => {};

  const handleClick = (id, coordinatesArr) => {
    // setMarker(id)
    console.log('fired', id, coordinatesArr);
    setZoom(11);
    setCenter(coordinatesArr);
    console.log('refffff', markerRefs[id].openPopup());
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
  // let mapRef = useRef(null);
  // let markerRef = useRef(null);

  // const onClickShowMarker = (markerLocation) => {
  //   const map = mapRef.current;
  //   if (!map) {
  //     return;
  //   }
  //   map.flyTo(markerLocation, 13);
  //   const marker = markerRef.current;
  //   if (marker) {
  //     marker.openPopup();
  //   }
  // };

  console.log('data active', data.length, 'data', data);
  console.log('mmmmmark', markerRefs);
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
                    // onClick={() => onClickShowMarker(dataItem.location.coordinates)}
                    onClick={() => handleClick(index, dataItem.location.coordinates)}
                  >
                    {dataItem.title}
                  </Segment>
                ))}
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          {/* <MapContainerDiv
            data={data.filter((item) => !!item.location)}
            markerRef={markerRef}
            mapRef={mapRef}
          /> */}
          <MapContainer
            bounds={L.latLngBounds(dataCoords)}
            center={center}
            // zoom={zoom}
            // scrollWheelZoom={true}
            // whenCreated={(map) => {
            //   mapRef.current = map;
            // }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((place, index) => (
              <Marker
                // ref={markerRef}
                ref={(ref) => {
                  markerRefs[index] = ref;
                  console.log('inner', markerRefs);
                }}
                key={place.id}
                position={place.location.coordinates}
                // eventHandlers={{ click: () => showPreview
              >
                <Popup>
                  {' '}
                  {/* <Segment
                    // color={colors[Math.floor(Math.random() * colors.length)]}
                    style={{ cursor: 'pointer' }}
                    className="map-card"
                    vertical
                   
                  >
                    <p>{place.title}</p>
                    <Progress
                      color="purple"
                      percent={
                        place.currentAmount ? (place.currentAmount / place.targetAmount) * 100 : 0
                      }
                      progress
                      style={{ margin: '0 2rem 2rem 2rem', height: '2rem' }}
                      // content={`$${data.currentAmount} Raised`}
                    >
                      <p style={{ color: 'gray' }}>{`$${place.currentAmount} Raised`}</p>
                    </Progress>
                  </Segment>{' '} */}
                  {/* <div style={{ height: '5rem' }}> */}
            
                    <CardItem data={place} maps={true} />
                  {/* </div> */}
                </Popup>
              </Marker>
            ))}
            {/* <Marker position={[51.505, -0.09]}>
          <Popup>Website Name</Popup>
        </Marker> */}
          </MapContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Maps;
