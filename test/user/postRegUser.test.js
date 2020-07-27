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

describe('/POST Register user', () => {
  it('Should get all posts', async () => {
    const res = await request(app).post('/api/user/register').send({
      username: 'example1',
      email: 'example1@mail.com',
      password: '12345',
    });
    expect(res.statusCode).toEqual(200);
  });
  it('Should throw an error as some fields are missing and return a 400', async () => {
    const res = await request(app).post('/api/user/register').send({
      username: 'example',
      password: '12345',
    });
    expect(res.statusCode).toEqual(400);
  });
  it('Should throw an error as the user already exists and return a 400', async () => {
    const res = await request(app).post('/api/user/register').send({
      username: 'example',
      email: 'example@mail.com',
      password: '12345',
    });
    expect(res.statusCode).toEqual(400);
  });
});
