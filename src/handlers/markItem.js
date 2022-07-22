const { storeJSON } = require('./dataManager');

const markItemStatus = (allToDo, dbPath) => {
  return (req, res) => {
    const { id } = req.params;
    const { itemId } = req.params;
    const lists = req.toDo.lists;
    const list = lists.find(list => list.id === id);

    const items = list.items;
    const item = items.find(item => item.id === itemId);
    item.done = item.done ? false : true;
    storeJSON(allToDo, dbPath);
    res.end('');
  };
};

module.exports = { markItemStatus };
