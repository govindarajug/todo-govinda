const logInHandler = (users) => {
  return (req, res) => {
    const { username } = req.body;
    if (username) {
      if (!users.includes(username)) {
        res.redirect('/login.html');
        return;
      };

      req.session = { id: new Date().getTime().toString(), username };
      res.redirect('/');
      return;
    }
    res.redirect('/login.html');
  };
};

module.exports = { logInHandler };
