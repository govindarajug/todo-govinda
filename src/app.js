const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const { logInHandler } = require('./handlers/logInHandler');
const { signUpHandler } = require('./handlers/signUpHandler');
const { logOutHandler } = require('./handlers/logOutHandler');

const { apiHandler } = require('./handlers/apiHandler.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { injectToDo } = require('./handlers/injectToDo.js');
const { getJSON } = require('./handlers/dataManager.js');

const { addList } = require('./handlers/addListHandler.js');
const { deleteList } = require('./handlers/deleteList');

const createToDoRouter = (allToDo) => {
  const toDoRouter = express.Router();
  toDoRouter.use(injectToDo(allToDo));
  return toDoRouter;
};

const createApp = (config) => {
  const allToDo = getJSON(config.dbPath);
  const app = express();
  app.use(morgan('tiny'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieSession({
    name: 'session',
    keys: [config.key]
  }));

  app.post('/login', logInHandler(config.users));
  app.post('/signup', signUpHandler(config.users));

  app.get('/logOut', logOutHandler);

  toDoRouter = createToDoRouter(allToDo);
  app.use('/', toDoRouter);
  toDoRouter.get('/api/to-do', apiHandler);
  toDoRouter.get('/', serveHomePage);

  app.post('/addList', addList(allToDo, config.dbPath));

  app.post('/delete/:id', deleteList(allToDo, config.dbPath));

  app.use(express.static('./public'));
  return app;
};

module.exports = { createApp };
