import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

const MapContainerDiv = ({ data, markerRef, mapRef }) => {
  const defaultPosition = [48.864716, 2.349];

  // const places = [
  //   //  ['LOCATION_1', 11.8166, 122.0942],
  //   //  ['LOCATION_2', 11.9804, 121.9189],
  //   //  ['LOCATION_3', 10.7202, 122.5621],
  //   //  ['LOCATION_4', 11.3889, 122.6277],
  //   //  ['LOCATION_5', 10.5929, 122.6325],

  //   {
  //     title: 'Eiffel Tower',
  //     description:
  //       'The Eiffel Tower (/ˈaɪfəl/ EYE-fəl; French: tour Eiffel [tuʁ‿ɛfɛl]) is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
  //     picture:
  //       'https://t2.gstatic.com/images?q=tbn:ANd9GcQ8iFga8aDttbI5iBkKgDmqOSV7LdcsVkfDHezlLYWrGDT7OajbZJh4qS1kiNbN1kkUHmz4SWPOS98AC5HubKYyKw',
  //     position: [48.858222, 2.2945],
  //     seeMoreLink: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
  //   },

  //   {
  //     title: 'Louvre Museum',
  //     description:
  //       "The Louvre (English: /ˈluːv(rə)/ LOOV(-rə)[3]), or the Louvre Museum (French: Musée du Louvre [myze dy luvʁ]), is the world's largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city's 1st arrondissement (district or ward). Approximately 38,000 objects from prehistory to the 21st century are exhibited over an area of 72,735 square meters (782,910 square feet). In 2019, the Louvre received 9.6 million visitors, making it the most visited museum in the world.",
  //     picture:
  //       'https://media-exp1.licdn.com/dms/image/C4D1BAQHRblI0BcMdMg/company-background_10000/0/1552905854220?e=2159024400&v=beta&t=l1ZJjkecqUDP1QjmmdY8TvCJHY5e2YM41UuTWCEKa7c',
  //     position: [48.861111, 2.336389],
  //     seeMoreLink: 'https://en.wikipedia.org/wiki/Louvre',
  //   },
  //   {
  //     title: 'Notre-Dame de Paris',
  //     description:
  //       'Notre-Dame de Paris (French: [nɔtʁə dam də paʁi]; meaning "Our Lady of Paris"), referred to simply as Notre-Dame,is a medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. The cathedral was consecrated to the Virgin Mary and considered to be one of the finest examples of French Gothic architecture. Its pioneering use of the rib vault and flying buttress, its enormous and colourful rose windows, as well as the naturalism and abundance of its sculptural decoration set it apart from the earlier Romanesque style. Major components that make Notre Dame stand out include its large historic organ and its immense church bells.',
  //     picture:
  //       'https://t1.gstatic.com/images?q=tbn:ANd9GcTP7Kev8E9D4tRQx70zbwJejhXbrWDSHe4YPnZRm2_iF3yXnB-J8_f6BbJov2HUz1IWVM2tpRLR2QEqkfyEkIsX1Q',
  //     position: [48.853, 2.3498],
  //     seeMoreLink: 'https://en.wikipedia.org/wiki/Notre-Dame_de_Paris',
  //   },
  // ];
  const showPreview = (place) => {
    // show place's description
  };

  console.log('MarkerREF', markerRef, mapRef)
  return (
    <div className="map__container">
      {/* <MapContainer center={defaultPosition} zoom={13} style={{ height: 80, width: 80 }}> */}
      {/* <MapContainer center={[51.505, -0.09]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer> */}
      <MapContainer
        center={[48.864716, 2.349]}
        zoom={17}
        
        scrollWheelZoom={true}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((place) => (
          <Marker
          
            ref={markerRef}
            key={place.id}
            position={place.location.coordinates} // 👈
            eventHandlers={{ click: () => showPreview(place) }}
          >
            {/* show place's title on hover the marker */}
            <Tooltip>{place.title}</Tooltip>
          </Marker>
        ))}
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>Website Name</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default MapContainerDiv;
