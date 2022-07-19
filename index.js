const { createApp } = require("./src/app.js");

const startServer = (port) => {
  const app = createApp();
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

startServer('8000');
