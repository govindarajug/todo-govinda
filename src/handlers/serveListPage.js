const listPageTemplate = `<html>

<head>
  <title>
    TO-DO
  </title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <link rel="stylesheet" href="/styles/homepage.css">
    <script src="/scripts/xhrutils.js"></script>
    <script src="/scripts/formUtils.js"></script>
    <script src="/scripts/createElement.js"></script>
  <script src="/scripts/listPage.js"></script>
</head>

<body>
  <div class="pagewrapper">
    <header>
      <a href="/"><h1>TODO</h1></a>
      <div class="sidebar">
      <input type="searchbox" name="searchkey" placeholder="Search"></input>
      <div class="username">__USER__</div>
        <div class="logout"><a href="/logOut" class="material-icons">logout</a></div>
      </div>
    </header>
    <main class="listContainer">
    </main>
  </div>
</body>

</html>`;

const serveListPage = (req, res) => {
  const { username } = req.session;
  const content = listPageTemplate.replace('__USER__', username);
  res.set('content-type', 'text/html');
  res.send(content);
};

module.exports = { serveListPage };
