const request = require('supertest');
const { createApp } = require('../src/app.js');
const { getJSON, storeJSON } = require('../src/handlers/dataManager.js');

const usersData = {
  "spider": {
    "username": "spider",
    "password": "123"
  }
};

const allToDo = {
  "spider": {
    "username": "spider",
    "lists": [
      {
        "id": "1",
        "title": "School",
        "items": [
          {
            "id": "1",
            "description": "science",
            "done": false
          },
          {
            "id": "2",
            "description": "enter lab",
            "done": true
          }
        ]
      },
      {
        "id": "2",
        "title": "task deleting",
        "items": []
      }
    ]
  }
};

storeJSON(usersData, './test/db/users.json');
storeJSON(allToDo, './test/db/toDo.json');

describe('login requests', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  it('Should redirect to homepage when credentials are correct', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .expect('location', '/')
      .expect(302, done);
  });

  it('Should redirect to login if credentials are wrong', (done) => {
    request(createApp(config))
      .post('/login')
      .send('username=abcd')
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('signup requests', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json',
    usersDb: './test/db/users.json'
  };
  it('Should redirect to home after signingup', (done) => {
    request(createApp(config))
      .post('/signup')
      .send('username=abcd&password=111')
      .expect('location', '/')
      .expect(302, done);
  });

  it('Should redirect to signup when username is already taken', (done) => {
    request(createApp(config))
      .post('/signup')
      .send('username=spider&password=123')
      .expect('location', '/signup')
      .expect(302, done);
  });
});

describe('logout requests', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  it('Should redirect to login after logging out', (done) => {
    request(createApp(config))
      .get('/logout')
      .set('Cookie', 'id=1')
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('apiHandler', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
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
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
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
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should delete list when path is POST /delete/:id', (done) => {
    request(createApp(config))
      .post('/delete/2')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('show lists', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should give list when path is GET /api/to-do/:id', (done) => {
    request(createApp(config))
      .get('/api/to-do/lists/1')
      .set('Cookie', cookie)
      .expect('content-type', /json/)
      .expect(200, done);
  });
});

describe('add item', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should add item when path is POST /addItem/', (done) => {
    request(createApp(config))
      .post('/lists/1/addItem')
      .send('newItem=cake')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('delete item', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should add item when path is POST /deleteItem/:listId/:itemId', (done) => {
    request(createApp(config))
      .post('/delete/1/2')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('mark item', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should toggle item status when path is POST /mark/:listId/:itemId', (done) => {
    request(createApp(config))
      .post('/mark/1/1')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('edit title of a list', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should edit list title when path is POST /edit/:listId', (done) => {
    request(createApp(config))
      .post('/edit/1')
      .send('newTitle=home work')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});

describe('edit a item description of a list', () => {
  const config = {
    key: 'somekey',
    users: getJSON('./test/db/users.json'),
    dbPath: './test/db/toDo.json'
  };
  let cookie;
  beforeEach((done) => {
    request(createApp(config))
      .post('/login')
      .send('username=spider&password=123')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  it('Should edit item description in a list when path is POST /edit/:listId/:itemId', (done) => {
    request(createApp(config))
      .post('/edit/1/1')
      .send('newDesc=social')
      .set('Cookie', cookie)
      .expect(200, done);
  });
});
