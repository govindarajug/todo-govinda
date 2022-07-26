const { storeJSON } = require('./dataManager');

const addList = (allToDo, dbPath) => {
  return (req, res) => {
    const newList = {
      id: new Date().getTime().toString(),
      title: req.body.title,
      items: []
    };
    req.toDo.lists.unshift(newList);
    storeJSON(allToDo, dbPath);
    res.redirect('/');
  };
};

module.exports = { addList };
