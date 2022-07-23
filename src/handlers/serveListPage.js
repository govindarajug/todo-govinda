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
      <h1>TODO</h1>
      <div class="back"><a href="/">back</a></div>
    </header>
    <main class="listContainer">
    </main>
  </div>
</body>

</html>`;

const serveListPage = (req, res) => {
  res.set('content-type', 'text/html');
  res.send(listPageTemplate);
};

module.exports = { serveListPage };
