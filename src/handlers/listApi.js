const listApi = (req, res) => {
  const { id } = req.params;
  const lists = req.toDo.lists;
  const list = lists.find(list => list.id === id);
  res.json(list);
  return;
};

module.exports = { listApi };
