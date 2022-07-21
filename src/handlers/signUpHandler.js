const signUpHandler = (users, allToDo) => {
  return (req, res) => {
    const { username } = req.body;
    if (!username) {
      res.redirect('/signup.html');
      return;
    }
    users.push(username);
    allToDo[username] = { username, lists: [] };
    res.redirect('/login.html');
    return;
  };
};

module.exports = { signUpHandler };
