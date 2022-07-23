const homePageTemplate = `<html>

<head>
  <title>
    TODO
  </title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <link rel="stylesheet" href="styles/homepage.css">
    <script src="scripts/xhrutils.js"></script>
    <script src="scripts/formUtils.js"></script>
    <script src="scripts/createElement.js"></script>
  <script src="scripts/homepage.js"></script>
</head>

<body>
  <div class="pagewrapper">
    <header>
      <h1>TODO</h1>
      <div class="sidebar"><div class="username">__USER__</div>
        <div class="logout"><a href="/logOut">logout</a></div>
      </div>
    </header>
    <main class="listContainer">
      <form method="post" action="/addList" class="newTODO item">
        <input type="text" name="title" id="title" placeholder="Title your TODO" required="required">
        <input type="submit" value="Add" id="save">
      </form>
    </main>
  </div>
</body>

</html>`;

const serveHomePage = (req, res) => {
  const { username } = req.session;
  const content = homePageTemplate.replace('__USER__', username);
  res.set('content-type', 'text/html');
  res.send(content);
};

module.exports = { serveHomePage };
