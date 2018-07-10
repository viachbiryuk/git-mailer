const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const CONF = require('../../conf');

class Db {

  constructor () {
    this.$user = require('./managers/user.manager');
  }

  async connect () {
    const opts = {
      dbName: CONF.db.dbName,
      useNewUrlParser: true
    };

    return mongoose.connect(CONF.db.dbUri, opts)
      .then((connection) => {
        this.connection = connection;
        console.log('database::connected!');
        return connection;
      })
      .catch((error) => {
        console.log('database::connection-error:', error);
        return error;
      })
  }

}

module.exports = new Db();
