const fs = require('fs');

const apiHandler = (req, res) => {
  const allToDo = JSON.parse(fs.readFileSync('db/toDo.json'));

  const username = req.session.username;
  const toDo = allToDo[username];
  res.json(toDo);
  return;
};

module.exports = { apiHandler };
