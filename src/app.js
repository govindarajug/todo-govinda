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
const { listApi } = require('./handlers/listApi');
const { authenticationHandler } = require('./handlers/authenticationHandler');
const { serveListPage } = require('./handlers/serveListPage');
const { addItem } = require('./handlers/addItemHandler');
const { deleteItem } = require('./handlers/deleteItem');
const { markItemStatus } = require('./handlers/markItem');

const createToDoRouter = (allToDo) => {
  const toDoRouter = express.Router();
  toDoRouter.use(authenticationHandler);
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
  app.post('/signup', signUpHandler(config.users, allToDo));

  app.get('/logOut', logOutHandler);

  app.use(express.static('./public'));

  toDoRouter = createToDoRouter(allToDo);
  app.use(toDoRouter);
  toDoRouter.get('/api/to-do', apiHandler);
  toDoRouter.get('/api/to-do/lists/:id', listApi);
  toDoRouter.get('/lists/:id', serveListPage);
  toDoRouter.get('/', serveHomePage);

  toDoRouter.post('/addList', addList(allToDo, config.dbPath));
  toDoRouter.post('/lists/:id/addItem', addItem(allToDo, config.dbPath));
  toDoRouter.post('/delete/:id/:itemId', deleteItem(allToDo, config.dbPath));
  toDoRouter.post('/mark/:id/:itemId', markItemStatus(allToDo, config.dbPath));

  app.post('/delete/:id', deleteList(allToDo, config.dbPath));

  return app;
};

module.exports = { createApp };
