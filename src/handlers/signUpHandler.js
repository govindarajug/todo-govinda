const signUpHandler = (users) => {
  return (req, res, next) => {
    if (req.url === '/signup') {
      const { username } = req.body;
      if (!username) {
        res.redirect('/signup.html');
        return;
      }
      users.push(username);
      res.redirect('/login.html');
      return;
    }
    next();
  };
};

module.exports = { signUpHandler };
