const { createApp } = require("./src/app.js");
const { getJSON } = require('./src/handlers/dataManager.js');
require('dotenv').config();

const startServer = (port) => {
  const config = {
    key: process.env.key,
    users: getJSON('./db/users.json'),
    dbPath: process.env.dbPath,
    usersDb: './db/users.json'
  };

  const app = createApp(config);
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

startServer('8000');
