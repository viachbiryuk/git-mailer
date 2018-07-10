module.exports = {
  db: {
    dbUri: 'mongodb://localhost:27017',
    dbName: 'gitmailer'
  },
  githubAPI: {
    id: '',
    secret: ''
  },
  openWeatherMap: {
    uri: 'http://api.openweathermap.org/',
    key: ''
  },
  gmailCreds: {
    email: '',
    password: ''
  },
  googleGeocodingAPI: {
    key: ''
  },
  apiPort: process.env.PORT || 3536,
  secretKey: 'roses-are-red',
  staticDir: './public/'
};
