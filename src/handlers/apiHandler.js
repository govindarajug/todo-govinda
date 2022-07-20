const apiHandler = (req, res) => {
  res.json(req.toDo);
  return;
};

module.exports = { apiHandler };
