const homePageTemplate = `<html>

<head>
  <title>
    TO-DO
  </title>
  <link rel="stylesheet" href="styles/homepage.css">
    <script src="scripts/xhrutils.js"></script>
  <script src="scripts/homepage.js"></script>
</head>

<body>
  <div class="pagewrapper">
    <header>
      <h2 class="greeting">Hello Spiderman</h2>
      <h1>TO-DO</h1>
      <div class="logout"><a href="/logOut">logout</a></div>
    </header>
    <nav class="sidebar">
      <ul>
        <li><a href="#">Grocery</a></li>
        <li><a href="#">Office</a></li>
        <li><a href="#">Homework</a></li>
      </ul>
    </nav>
    <main class="listContainer">
      <article class="newToDo">
        <div>Click to add new TO-DO</div>
      </article>
    </main>
  </div>
</body>

</html>`;

const serveHomePage = (req, res) => {
  res.set('content-type', 'text/html');
  res.send(homePageTemplate);
};

module.exports = { serveHomePage };
