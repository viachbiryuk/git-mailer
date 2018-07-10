const userModel = require('../models/user.model');
const crypto = require('crypto');
const CONF = require('../../../conf');
const _ = require('lodash');

class UserManager {

  constructor () {}

  async create (payload) {
    let caught = null;

    let toCreate = _.clone(payload);
    toCreate.token = this.genToken(toCreate.email);
    toCreate.password = this.cipherPassword(toCreate.email, toCreate.password);

    let user = await userModel.create(toCreate)
      .catch((error) => {
        caught = error;
      });

    return {
      doc: user || null,
      error: caught
    };
  }

  async updateUserToken (userEmail, token) {
    let caught = null;
    const affected = userModel.findOneAndUpdate({ email: userEmail }, { token })
      .catch((error) => {
        caught = error;
      });

    return {
      affected: affected.length ? affected[0]: null,
      error: caught
    };
  }

  async findOneByEmail (email) {
    return await this.findOneBy({ email });
  }

  async findOneBy (query) {
    let caught = null;
    const found = await userModel.findOne(query)
      .catch((error) => {
        caught = error;
      });
    return {
      doc: found || null,
      error: caught
    };
  }

  genToken (email) {
    return crypto.createHmac('sha256', email)
      .update(CONF.secretKey)
      .update(Date.now().toString())
      .digest('hex');
  }

  cipherPassword (email, rawPassword) {
    return crypto.createHmac('sha256', rawPassword)
      .update(email)
      .update(CONF.secretKey)
      .digest('hex');
  }

  async verifyPassword (email, rawPassword) {
    const cipheredPassword = this.cipherPassword(email, rawPassword);
    const { doc } = await this.findOneBy({ password: cipheredPassword });
    return Boolean(doc)
  }



}


module.exports = new UserManager();
