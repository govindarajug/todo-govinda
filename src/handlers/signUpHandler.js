const signUpHandler = (users) => {
  return (req, res) => {
    const { username } = req.body;
    if (!username) {
      res.redirect('/signup.html');
      return;
    }
    users.push(username);
    res.redirect('/login.html');
    return;
  };
};

module.exports = { signUpHandler };
