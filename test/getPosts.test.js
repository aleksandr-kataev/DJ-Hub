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

// describe('POST Endpoint', () => {
//   it('Should post a post', async () => {
//     const res = await request(app).post('/api/posts').send({
//       title: '1k mix',
//       username: 'bou',
//       link: 'www.soundcloud/bou.com',
//       tag: 'dnb',
//     });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('post');
//   });
// });
