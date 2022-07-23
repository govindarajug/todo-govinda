const logOutHandler = (req, res, next) => {
  req.session = null;
  res.redirect('/login');
};

module.exports = { logOutHandler };
