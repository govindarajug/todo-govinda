const fs = require('fs');

const serveLoginPage = (req, res, next) => {
  if (req.session.username) {
    res.redirect('/');
    return;
  }
  const template = fs.readFileSync('./templates/loginTemplate.html', 'utf-8');
  const { message } = req.cookies;
  const content = template.replace('__MESSAGE__', message ? message : '');
  res.end(content);
};

module.exports = { serveLoginPage };
