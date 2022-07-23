const logInHandler = (users) => {
  return (req, res) => {
    const { username } = req.body;
    if (username) {
      if (!users.includes(username)) {
        res.cookie('message', 'Username or password incorrect.', { maxAge: 1000 });
        res.redirect('/login');
        return;
      };

      req.session = { id: new Date().getTime().toString(), username };
      res.redirect('/');
      return;
    }
    res.redirect('/login');
  };
};

module.exports = { logInHandler };
