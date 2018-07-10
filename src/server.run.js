const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');
const passport = require('passport');
const authStrategy = require('./helpers/auth.strategy');
const CONF = require('../conf');
const errorHandler = require('./helpers/error.handler');

const db = require('./db');
db.connect();
passport.use(authStrategy);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static(__dirname + './../public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.use(errorHandler);


app.listen(CONF.apiPort, () => {
  console.log('Server runs on port:', CONF.apiPort);
});

