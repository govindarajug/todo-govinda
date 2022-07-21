const authenticationHandler = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/login.html');
    return;
  };
  next();
};

module.exports = { authenticationHandler };
