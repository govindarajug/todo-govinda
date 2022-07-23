const authenticationHandler = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/login');
    return;
  };
  next();
};

module.exports = { authenticationHandler };
