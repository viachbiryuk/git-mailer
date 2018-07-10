const mailSrv = require('../services/mail.srv');
const messageSrv = require('../services/message.srv');


class MailingSeq {

  static prepareWeatherMessageTemplate (weather, mailingData) {
    return Promise.resolve()
      .then(() => messageSrv.composeWeatherMessage(weather))
      .then((weatherMessage) => {
        mailingData.weather = weatherMessage;
        return messageSrv.renderMessageTemplate('weather-message', mailingData);
      });
  }

  static sendMailToGithubUserArray (gathered, mailingData) {
    let promises = [];
    gathered.map((item) => {
      const promised = MailingSeq.sendMailToGithubUser(
        item.nickname,
        mailingData,
        item.store.weather,
        item.store.user.email
      );
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

  static sendMailToGithubUser (nickname, mailingData, weather, userEmail) {
    let store = {};
    let failedOperation = 'prepare-template';
    return MailingSeq.prepareWeatherMessageTemplate(weather, mailingData)
      .then((weatherMailTpl) => {
        failedOperation = 'send-mail';
        return mailSrv.to(userEmail, mailingData.subject, mailingData.message, weatherMailTpl);
      })
      .then((mailed) => {
        store.mailed = mailed;
        return {
          nickname,
          store,
          failedOperation: null,
          success: true,
          error: null
        }
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


module.exports = MailingSeq;
