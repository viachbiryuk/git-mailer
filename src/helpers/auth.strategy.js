const Strategy = require('passport-http-bearer').Strategy;
const db = require('../db');

module.exports = new Strategy(async (token, done) => {
  const { doc , error } = await db.$user.findOneBy({ token });
  if (error !== null) {
    return done(error);
  }
  if (doc === null) {
    return done(null, false);
  }
  return done(null, doc);
});
