const logInHandler = (users) => {
  return (req, res, next) => {
    const { username } = req.body;
    if (username) {
      if (!users.includes(username)) {
        res.redirect('/signup.html');
        return;
      };

      req.session = { id: new Date().getTime().toString(), username };
      res.redirect('/');
      return;
    }
    res.redirect('/login.html');
    return;
  };
};

module.exports = { logInHandler };
