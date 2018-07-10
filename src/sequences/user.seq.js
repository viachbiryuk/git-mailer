const githubSrv = require('../services/github.srv');
const geoSrv = require('../services/geolocation.srv');
const weatherSrv = require('../services/weather.srv');


class UserSequence {

  static gatherUserArrayDetails (nicknameArray, mailingData) {
    let promises = [];
    nicknameArray.map((nickname) => {
      const promised = UserSequence.gatherUserDetails(nickname, mailingData);
      promises.push(promised);
    });
    return Promise.all(promises)
      .then((result) => {
        return {
          allSuccessful: result.find(item => item.success === false) || true,
          sequenceResult: result
        };
      });
  }

  static gatherUserDetails (nickname) {
    let store = {};
    let failedOperation = 'find-github-user';
    return githubSrv.findUser(nickname)
      .then((user) => {
        store.user = user;
        failedOperation = 'get-user-location';
        return geoSrv.whereIs(user.location);
      })
      .then((location) => {
        store.location = location;
        failedOperation = 'get-user-weather';
        return weatherSrv.getCurrentWeather(location.city, location.countryCode);
      })
      .then((weather) => {
        store.weather = weather;
        return {
          nickname,
          store,
          failedOperation: null,
          success: true,
          error: null
        };
      })
      .catch((error) => {
        return {
          nickname,
          store,
          failedOperation,
          success: false,
          error: error
        }
      });
  }

}


module.exports = UserSequence;
