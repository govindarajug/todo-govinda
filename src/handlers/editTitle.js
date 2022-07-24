const { storeJSON } = require('./dataManager');

const editTitle = (allToDo, dbPath) => {
  return (req, res) => {
    const { id } = req.params;
    const lists = req.toDo.lists;
    const list = lists.find(list => list.id === id);

    const { newTitle } = req.body;

    list.title = newTitle;
    storeJSON(allToDo, dbPath);
    res.json(req.toDo);
  };
};

module.exports = { editTitle };
