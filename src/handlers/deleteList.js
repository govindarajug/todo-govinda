const { storeJSON } = require('./dataManager');

const deleteList = (allToDo, dbPath) => {
  return (req, res) => {
    const { id } = req.params;
    const lists = req.toDo.lists;
    const list = lists.find(list => list.id === id);
    lists.splice(lists.indexOf(list), 1);
    storeJSON(allToDo, dbPath);
    res.json(req.toDo);
  };
};

module.exports = { deleteList };
