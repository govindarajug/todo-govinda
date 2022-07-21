const fs = require('fs');

const getJSON = (path) => {
  try {
    let allToDo = fs.readFileSync(path, 'utf-8');
    return JSON.parse(allToDo);
  } catch (error) {
    return {};
  }
};

const storeJSON = (data, path) => {
  fs.writeFileSync(path, JSON.stringify(data), 'utf-8');
};

module.exports = { getJSON, storeJSON };
