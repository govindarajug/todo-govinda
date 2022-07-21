const listPageTemplate = `<html>

<head>
  <title>
    TO-DO
  </title>
  <link rel="stylesheet" href="/styles/homepage.css">
    <script src="/scripts/xhrutils.js"></script>
    <script src="/scripts/formUtils.js"></script>
    <script src="/scripts/createElement.js"></script>
  <script src="/scripts/listPage.js"></script>
</head>

<body>
  <div class="pagewrapper">
    <header>
      <h2 class="greeting">Hello</h2>
      <h1>TO-DO</h1>
      <div class="back"><a href="/">back</a></div>
    </header>
    <main class="listContainer">
      <form method="post" action="/addList" class="newTODO">
        <div>
          <label for="item"></label>
          <input type="text" name="title" id="title" placeholder="Add your items">
        </div>
        <input type="submit" value="Add" id="save">
      </form>
    </main>
  </div>
</body>

</html>`;

const serveListPage = (req, res) => {
  res.set('content-type', 'text/html');
  res.send(listPageTemplate);
};

module.exports = { serveListPage };
