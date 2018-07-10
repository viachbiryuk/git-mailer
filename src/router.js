const express = require('express');
const passport = require('passport');
const validateReq = require('./middlewares/validate-req.mdl');
const acceptFile = require('./middlewares/accept-file.mdl');
const imageThumb = require('./middlewares/image-thumb.mdl');

const ctrl = require('./controllers');
const router = express.Router();

router.route('/sign-in')
  .post(ctrl.$auth.signIn)
;

router.route('/sign-up')
  .post(
    validateReq('sign-up'),
    acceptFile('avatar', 'avatars'),
    imageThumb('avatars', 'Avatar image is not provided'),
    ctrl.$auth.signUp
  )
;

router.route('/message-to')
  .post(
    passport.authenticate('bearer', { session: false }),
    validateReq('send-message'),
    ctrl.$message.sendMessage
  )
;



module.exports = router;
