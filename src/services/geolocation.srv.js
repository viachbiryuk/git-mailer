const Promise = require('bluebird');
const NodeGeocoder = require('node-geocoder');
const CONF = require('../../conf');

class GeolocationService {

  constructor () {
   let options = {
      provider: 'google',
      // Optional depending on the providers
      httpAdapter: 'https', // Default
      apiKey: CONF.googleGeocodingAPI.key, // for Mapquest, OpenCage, Google Premier
      formatter: null  // 'gpx', 'string', ...
    };

    this.geocoder = NodeGeocoder(options);
  }

  whereIs (location) {
    return this.geocoder.geocode(location)
      .then((result) => {
        return result[0];
      });
  }


}


module.exports = new GeolocationService();
