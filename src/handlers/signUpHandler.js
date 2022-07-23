const signUpHandler = (users, allToDo) => {
  return (req, res) => {
    const { username } = req.body;
    if (users.includes(username)) {
      res.cookie('message', 'Username already in use.', { maxAge: 1000 });
      res.redirect('/signup');
      return;
    }
    users.push(username);
    allToDo[username] = { username, lists: [] };
    req.session = { id: new Date().getTime().toString(), username };
    res.redirect('/');
  };
};

module.exports = { signUpHandler };
