const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../../db_handler');

afterAll(() => dbHandler.closeDatabase());

beforeAll((done) => {
  request(app)
    .post('/api/user/register')
    .send({
      username: 'example',
      email: 'example@mail.com',
      password: '12345',
    })
    .end(() => {
      done();
    });
});

describe('/POST Login', () => {
  it('Should login a user and return a 200', async () => {
    const res = await request(app).post('/api/user/login').send({
      username: 'example',
      password: '12345',
    });
    expect(res.statusCode).toEqual(200);
  });
  it('Should throw an error (wrong username) and return a 400', async () => {
    const res = await request(app).post('/api/user/login').send({
      username: 'wrongUsername',
      password: '12345',
    });
    expect(res.statusCode).toEqual(400);
  });
  it('Should throw an error (wrong password) and return a 400', async () => {
    const res = await request(app).post('/api/user/login').send({
      username: 'example',
      password: 'wrongPass',
    });
    expect(res.statusCode).toEqual(400);
  });
});
