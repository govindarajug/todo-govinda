const logOutHandler = (req, res, next) => {
  req.session = null;
  res.redirect('/login.html');
};

module.exports = { logOutHandler };
