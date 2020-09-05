const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../../db_handler');

afterAll(() => dbHandler.closeDatabase());

let token;
let username;
let postID;

beforeAll((done) => {
  request(app)
    .post('/api/user/register')
    .send({
      username: 'example',
      email: 'example@mail.com',
      password: '12345',
    })
    .end((regErr, regRes) => {
      token = regRes.body.token;
      username = regRes.body.user.username;
      request(app)
        .post('/api/posts')
        .set({ 'x-auth-token': token })
        .send({
          title: 'example mix',
          username,
          link: 'test.com',
          tag: 'test',
        })
        .end((postErr, postRes) => {
          postID = postRes.body.response.id;
          done();
        });
    });
});

describe('/DELETE', () => {
  // token not being sent - should respond with a 401
  it('It should require authorization', async () => {
    const res = await request(app).delete(`/api/posts/${postID}`);
    expect(res.statusCode).toEqual(401);
  });

  // Wrong postID supplied, should not find it and respond with a 400
  it('It should not find the record(wrongPostID)', async () => {
    const res = await request(app)
      .delete('/api/posts/wrongID')
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(400);
  });

  // Send the token - should respond with a 200
  it('It responds with JSON', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postID}`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
});
