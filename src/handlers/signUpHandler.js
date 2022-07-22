const signUpHandler = (users, allToDo) => {
  return (req, res) => {
    const { username } = req.body;
    if (!username) {
      res.redirect('/signup.html');
      return;
    }
    users.push(username);
    allToDo[username] = { username, lists: [] };
    req.session = { id: new Date().getTime().toString(), username };
    res.redirect('/');
  };
};

module.exports = { signUpHandler };
