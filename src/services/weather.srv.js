const axios = require('axios');
const CONF = require('../../conf');


class WeatherService {

  async getCurrentWeather(city, country) {
    city = encodeURIComponent(city);
    country = encodeURIComponent(country);
    return axios.get(`${CONF.openWeatherMap.uri}data/2.5/weather?q=${city},${country}&APPID=${CONF.openWeatherMap.key}&units=metric`)
      .then((result) => {
        return result.data;
      });
  }






}


module.exports = new WeatherService();
