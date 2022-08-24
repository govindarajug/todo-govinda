const { createApp } = require("./src/app.js");
const { getJSON } = require('./src/handlers/dataManager.js');
require('dotenv').config();

const startServer = (port, db) => {
  const config = {
    key: process.env.key,
    users: getJSON(db),
    dbPath: process.env.dbPath,
    usersDb: db
  };

  const app = createApp(config);
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

startServer(process.env.PORT, process.env.usersDb);
