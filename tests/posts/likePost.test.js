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

describe('/POST ', () => {
  it('Should return JSON with {modified: true}', async () => {
    const res = await request(app)
      .post(`/api/posts/${postID}/like/${userID}`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
  it('Should return 401 as no token is passed', async () => {
    const res = await request(app).post(
      `/api/posts/${postID}/like/${userID}`,
    );
    expect(res.statusCode).toEqual(401);
  });

  it('Should return a 400 as the postID does not exist in the DB', async () => {
    const res = await request(app)
      .post(`/api/posts/wrongPostID/like/${userID}`)
      .set({ 'x-auth-token': token });

    expect(res.statusCode).toEqual(400);
  });
});

describe('/DELETE ', () => {
  it('Should return JSON with {modified: true}', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postID}/unlike/${userID}`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
  it('Should return 401 as no token is passed', async () => {
    const res = await request(app).delete(
      `/api/posts/${postID}/unlike/${userID}`,
    );
    expect(res.statusCode).toEqual(401);
  });

  it('Should return a 400 as the postID does not exist in the DB', async () => {
    const res = await request(app)
      .delete(`/api/posts/wrongPostID/unlike/${userID}`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(400);
  });
});
