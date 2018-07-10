const nodemailer = require('nodemailer');
const CONF = require('../../conf');
const Promise = require('bluebird');

class MailService {

  constructor () {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: CONF.gmailCreds.email,
        pass: CONF.gmailCreds.password
      }
    });
    this.transporterPromise = Promise.promisifyAll(this.transporter);
  }

  to (to, subject, message, body) {
    const mailOptions = {
      from: CONF.gmailCreds.email,
      to,
      subject,
      html: body
    };

    console.log('TO:', to);
    return this.transporterPromise.sendMail(mailOptions).then((r) => {
      console.log('return:', r);
      return r;
    });
  }


}


module.exports = new MailService();
