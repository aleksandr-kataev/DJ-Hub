const request = require('supertest');
const app = require('../app');
const dbHandler = require('../db_handler');

afterAll(() => dbHandler.closeDatabase());

let token;

beforeAll((done) => {
  request(app)
    .post('/api/user/register')
    .send({
      username: 'example',
      email: 'example@mail.com',
      password: '12345',
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe('/POST', () => {
  // token not being sent - should respond with a 401
  it('It responds with JSON', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set({ 'x-auth-token': token })
      .send({
        title: 'example mix',
        userID: 'example',
        link: 'test.com',
        tag: 'test',
      });
    expect(res.statusCode).toEqual(200);
  });
  // send the token - should respond with a 200
  it('It should require authorization', async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'example mix',
      userID: 'example',
      link: 'test.com',
      tag: 'test',
    });
    expect(res.statusCode).toEqual(401);
  });
});
