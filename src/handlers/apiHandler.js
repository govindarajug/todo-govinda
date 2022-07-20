const fs = require('fs');

const apiHandler = (req, res) => {
  let allToDo = fs.readFileSync('db/toDo.json');
  allToDo = JSON.parse(allToDo);

  const username = req.session.username;
  const toDo = allToDo[username];
  res.json(toDo);
  return;
};

module.exports = { apiHandler };
