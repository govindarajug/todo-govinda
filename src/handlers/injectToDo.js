const injectToDo = (allToDo) => {
  return (req, res, next) => {
    const username = req.session.username;
    req.toDo = allToDo[username];
    next();
  };
};

module.exports = { injectToDo };
