const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httAdapter: 'https',

  // Optional depending on the providers
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

module.exports = NodeGeocoder(options);
 