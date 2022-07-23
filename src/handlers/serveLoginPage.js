const fs = require('fs');

const serveLoginPage = (req, res, next) => {
  const template = fs.readFileSync('./templates/loginTemplate.html', 'utf-8');
  const { message } = req.cookies;
  const content = template.replace('__MESSAGE__', message ? message : '');
  res.end(content);
};

module.exports = { serveLoginPage };
