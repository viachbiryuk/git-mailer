const Transform = require('../helpers/transform');
const UserSeq = require('../sequences/user.seq');
const MailingSeq = require('../sequences/mailing.seq');


class MessageCtrl {

  async sendMessage (req, res, next) {

    const mailingData = {
      subject: 'Any subject',
      message: req.body.message
    };

    const gatheredDetails = await UserSeq.gatherUserArrayDetails(req.body.users, mailingData);
    if (gatheredDetails.allSuccessful === false) {
      return next({
        status: 400,
        message: 'Sequence failed',
        detailed: new Transform(gatheredDetails.sequenceResult).loopExclude(['store', 'error']).out()
      });
    }

    const mailed = await MailingSeq.sendMailToGithubUserArray(gatheredDetails.sequenceResult, mailingData);
    if (mailed.allSuccessful === false) {
      return next({
        status: 400,
        message: 'Sequence failed',
        detailed: new Transform(gatheredDetails.sequenceResult).loopExclude(['store', 'error']).out()
      });
    }

    res.json({
      message: 'Operation sequence passed successfully',
      detailed: new Transform(gatheredDetails.sequenceResult).loopExclude(['store', 'error']).out()
    });

  }

}



module.exports = new MessageCtrl();
