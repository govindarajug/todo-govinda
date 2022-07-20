const fs = require('fs');

const getJSON = (path) => {
  let allToDo = fs.readFileSync(path, 'utf-8');
  return JSON.parse(allToDo);
};

const storeJSON = (data, path) => {
  fs.writeFileSync(path, JSON.stringify(data), 'utf-8');
};

module.exports = { getJSON, storeJSON };
