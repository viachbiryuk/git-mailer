const CONF = require('../../conf');
const pug = require('pug');
const path = require('path');

class MessageService {

  composeWeatherMessage (weatherObject) {
    let message = 'Weather in your area: ';
    message += `${weatherObject.weather[0].description}, `;
    message += `temperature: ${weatherObject.main.temp} °C, `;
    message += `wind speed: ${weatherObject.wind.speed} mpc. `;
    return message;
  }

  renderMessageTemplate (tplName, data) {
    const tplPath = path.resolve(__dirname, `../templates/${tplName}.pug`);
    return pug.renderFile(tplPath, data);
  }


}


module.exports = new MessageService();
