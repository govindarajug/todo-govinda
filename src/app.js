const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
require('dotenv').config();

const { logInHandler } = require('./handlers/logInHandler');
const { signUpHandler } = require('./handlers/signUpHandler');
const { logOutHandler } = require('./handlers/logOutHandler');
const { apiHandler } = require('./handlers/apiHandler');

const createApp = () => {
  const users = ['spider'];
  const app = express();
  app.use(morgan('tiny'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieSession({
    name: 'session',
    keys: [process.env.key]
  }));

  app.post('/login', logInHandler(users));
  app.post('/signup', signUpHandler(users));

  app.get('/logOut', logOutHandler);

  app.get('/api/to-do', apiHandler);

  app.use(express.static('./public'));
  return app;
};

module.exports = { createApp };
