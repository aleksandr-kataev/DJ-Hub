const request = require('supertest');
const app = require('../app');
const dbHandler = require('../db_handler');

afterAll(() => dbHandler.closeDatabase());

describe('Get Endpoint', () => {
  it('Should get all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toEqual(200);
  });
});
