const { storeJSON } = require('./dataManager');

const addItem = (allToDo, dbPath) => {
  return (req, res) => {
    const newItem = {
      id: new Date().getTime().toString(),
      description: req.body.newItem,
      done: false
    };
    const { id } = req.params;
    const lists = req.toDo.lists;
    const list = lists.find(list => list.id === id);
    list.items.push(newItem);
    storeJSON(allToDo, dbPath);
    res.end();
  };
};

module.exports = { addItem };
