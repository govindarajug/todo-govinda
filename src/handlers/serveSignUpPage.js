const fs = require('fs');

const serveSignupPage = (req, res, next) => {
  const template = fs.readFileSync('./templates/signupTemplate.html', 'utf-8');
  const { message } = req.cookies;
  const content = template.replace('__MESSAGE__', message ? message : '');
  res.end(content);
};

module.exports = { serveSignupPage };
