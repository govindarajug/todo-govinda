const logInHandler = (users) => {
  return (req, res) => {
    const { username } = req.body;
    if (username) {
      const newUsername = username.toLowerCase();
      console.log(users[newUsername]);
      if (!users[newUsername]) {
        res.cookie('message', 'Username or password incorrect.', { maxAge: 1000 });
        res.redirect('/login');
        return;
      };

      req.session = {
        id: new Date().getTime().toString(),
        'username': newUsername
      };
      res.redirect('/');
      return;
    }
    res.redirect('/login');
  };
};

module.exports = { logInHandler };
