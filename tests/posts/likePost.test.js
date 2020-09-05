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

describe('/POST ', () => {
  it('Should return 401 as no token is passed', async () => {
    const res = await request(app).post(`/api/posts/${postID}/like`);
    expect(res.statusCode).toEqual(401);
  });

  it('Should return a 400 as the postID does not exist in the DB', async () => {
    const res = await request(app)
      .post('/api/posts/wrongPostID/like')
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(400);
  });

  it('Should return JSON with {modified: true}', async () => {
    const res = await request(app)
      .post(`/api/posts/${postID}/like`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
});

describe('/DELETE ', () => {
  it('Should return 401 as no token is passed', async () => {
    const res = await request(app).delete(
      `/api/posts/${postID}/unlike`,
    );
    expect(res.statusCode).toEqual(401);
  });

  it('Should return a 400 as the postID does not exist in the DB', async () => {
    const res = await request(app)
      .delete('/api/posts/wrongPostID/unlike')
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(400);
  });

  it('Should return JSON with {modified: true}', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postID}/unlike`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
});
