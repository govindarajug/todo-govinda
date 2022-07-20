const request = require('supertest');
const { createApp } = require('../src/app.js');

describe('Static File Serving', () => {
  it('It should serve static file from public', (done) => {
    request(createApp())
      .get('/signup.html')
      .expect('content-type', /text\/html/)
      .expect(200, done);
  });

  it('It should serve home page when path GET /', (done) => {
    request(createApp())
      .get('/')
      .expect('content-type', /text\/html/)
      .expect(200, done);
  });
});

describe('login requests', () => {
  it('Should redirect to homepage when credentials are correct', (done) => {
    request(createApp())
      .post('/login')
      .send('username=spider')
      .expect('location', '/')
      .expect(302, done);
  });

  it('Should redirect to signup if not signedup', (done) => {
    request(createApp())
      .post('/login')
      .send('username=abcd')
      .expect('location', '/signup.html')
      .expect(302, done);
  });
});

describe('signup requests', () => {
  it('Should redirect to login after signingup', (done) => {
    request(createApp())
      .post('/signup')
      .send('username=abcd')
      .expect('location', '/login.html')
      .expect(302, done);
  });

  it('Should redirect to signup when username is not given', (done) => {
    request(createApp())
      .post('/signup')
      .send('username=')
      .expect('location', '/signup.html')
      .expect(302, done);
  });
});