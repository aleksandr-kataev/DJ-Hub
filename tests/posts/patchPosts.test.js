const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../../db_handler');

afterAll(() => dbHandler.closeDatabase());

let token;
let userID;
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
      userID = regRes.body.user.id;
      request(app)
        .post('/api/posts')
        .set({ 'x-auth-token': token })
        .send({
          title: 'example mix',
          userID,
          link: 'test.com',
          tag: 'test',
        })
        .end((postErr, postRes) => {
          postID = postRes.body.response.id;
          done();
        });
    });
});

describe('/PATCH ', () => {
  it('Should return JSON by passing like', async () => {
    const res = await request(app)
      .patch('/api/posts')
      .set({ 'x-auth-token': token })
      .send({
        type: 'like',
        userID,
        postID,
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Should return JSON by passing comment', async () => {
    const res = await request(app)
      .patch('/api/posts')
      .set({ 'x-auth-token': token })
      .send({
        type: 'comment',
        userID,
        postID,
        comment: 'test comment',
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Should return a 400 as the postID does not exist in the DB', async () => {
    const res = await request(app)
      .patch('/api/posts')
      .set({ 'x-auth-token': token })
      .send({
        type: 'comment',
        userID,
        postID: 'wrongID',
        comment: 'test comment',
      });
    expect(res.statusCode).toEqual(400);
  });
  it('Should return a 400 as the userID does not exist in the DB', async () => {
    const res = await request(app)
      .patch('/api/posts')
      .set({ 'x-auth-token': token })
      .send({
        type: 'like',
        userID: 'wrongID',
        postID,
        comment: 'test comment',
      });
    expect(res.statusCode).toEqual(400);
  });
});
