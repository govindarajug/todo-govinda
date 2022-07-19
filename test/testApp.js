const request = require('supertest');
const { createApp } = require('../src/app.js');

describe('Static File Serving', () => {
  it('It should serve static file from public', (done) => {
    request(createApp())
      .get('/signup.html')
      .expect('content-type',/text\/html/)
      .expect(200, done);
    });
    
    it('It should serve home page when path GET /', (done) => {
      request(createApp())
      .get('/')
      .expect('content-type',/text\/html/)
      .expect(200, done);
  });
});
