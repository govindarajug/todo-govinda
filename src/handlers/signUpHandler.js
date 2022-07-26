const { storeJSON } = require('./dataManager.js');

const signUpHandler = (users, allToDo, usersDb) => {
  return (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    let newUsername = username.toLowerCase();
    if (users[newUsername]) {
      res.cookie('message', 'Username already in use.', { maxAge: 1000 });
      res.redirect('/signup');
      return;
    }

    users[newUsername] = {
      "username": newUsername,
      "password": password
    };
    storeJSON(users, usersDb);
    allToDo[newUsername] = { 'username': newUsername, 'lists': [] };
    req.session = {
      id: new Date().getTime().toString(),
      'username': newUsername
    };
    res.redirect('/');
  };
};

module.exports = { signUpHandler };
