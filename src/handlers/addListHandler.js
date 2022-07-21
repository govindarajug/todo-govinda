const { storeJSON } = require('./dataManager');

const addList = (allToDo, dbPath) => {
  return (req, res) => {
    const newList = {
      id: new Date().getTime().toString(),
      title: req.body.title,
    };
    req.toDo.lists.push(newList);
    storeJSON(allToDo, dbPath);
    res.redirect('/');
  };
};

module.exports = { addList };
