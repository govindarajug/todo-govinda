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
    <script src="scripts/drawUtils.js"></script>
    <script src="scripts/createElement.js"></script>
  <script src="scripts/homepage.js"></script>
</head>

<body>
  <div class="pagewrapper">
    <header>
      <a href="/"><h1>TODO</h1></a>
      <div class="sidebar">
      <form action="/search"><input type="search" name="query" placeholder="Search"></input></form>
      <div class="username">__USER__</div>
        <div class="logout"><a href="/logOut" class="material-icons">logout</a></div>
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
