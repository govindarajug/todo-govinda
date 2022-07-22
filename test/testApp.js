const request = require('supertest');
const { createApp } = require('../src/app.js');

describe('Static File Serving', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  it('It should serve static file from public', (done) => {
    request(createApp(config))
      .get('/signup.html')
      .expect('content-type', /text\/html/)
      .expect(200, done);
  });
});

describe('login requests', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  it('Should redirect to homepage when credentials are correct', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .expect('location', '/')
      .expect(302, done);
  });

  it('Should redirect to login if credentials are wrong', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=abcd')
      .expect('location', '/login.html')
      .expect(302, done);
  });
});

describe('signup requests', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  it('Should redirect to home after signingup', (done) => {
    request(createApp(config))
      .post('/signup')
      .send('username=abcd')
      .expect('location', '/')
      .expect(302, done);
  });

  it('Should redirect to signup when username is not given', (done) => {
    request(createApp(config))
      .post('/signup')
      .send('username=')
      .expect('location', '/signup.html')
      .expect(302, done);
  });
});

describe('logout requests', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  it('Should redirect to login after logging out', (done) => {
    request(createApp(config))
      .get('/logout')
      .set('Cookie', 'id=1')
      .expect('location', '/login.html')
      .expect(302, done);
  });
});

describe('apiHandler', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should serve to-do of specific user when path is GET /api/to-do', (done) => {
    request(createApp(config))
      .get('/api/to-do')
      .set('Cookie', cookie)
      .expect('content-type', /json/)
      .expect(200, done);
  });
});

describe('addListHandler', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should add list with given title in todo', (done) => {
    request(createApp(config))
      .post('/addList')
      .send('title=newlist')
      .set('Cookie', cookie)
      .expect(302, done);
  });
});

describe('delete lists', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should delete list when path is POST /delete/:id', (done) => {
    request(createApp(config))
      .post('/delete/1658381052450')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('show lists', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should give list when path is GET /api/to-do/:id', (done) => {
    request(createApp(config))
      .get('/api/to-do/lists/2')
      .set('Cookie', cookie)
      .expect('content-type', /json/)
      .expect(200, done);
  });
});

describe('add item', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should add item when path is POST /addItem/', (done) => {
    request(createApp(config))
      .post('/lists/2/addItem')
      .send('newItem=cake')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('delete item', () => {
  const config = {
    key: 'somekey',
    users: ['spider'],
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should add item when path is POST /deleteItem/:listId/:itemId', (done) => {
    request(createApp(config))
      .post('/delete/2/1658494765921')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});
