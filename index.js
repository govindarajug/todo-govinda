const { createApp } = require("./src/app.js");
require('dotenv').config();

const startServer = (port) => {
  const config = {
    key: process.env.key,
    users: ['spider'],
    dbPath: process.env.dbPath
  };

  const app = createApp(config);
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

startServer('8000');
