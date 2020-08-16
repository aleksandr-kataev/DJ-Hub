const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../../db_handler');

let token;
let usernamePar;

afterAll(() => dbHandler.closeDatabase());

beforeAll((done) => {
  request(app)
    .post('/api/user/register')
    .send({
      username: 'example',
      email: 'example@mail.com',
      password: '12345',
    })
    .end((err, res) => {
      token = res.body.token;
      usernamePar = res.body.newUser.username;
      done();
    });
});

xdescribe('/GET User data', () => {
  it('Should get user data and return a 200', async () => {
    const res = await request(app)
      .get(`/api/user/${usernamePar}`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
  it('Should not find a user and return a 400', async () => {
    const res = await request(app)
      .get('/api/user/wrongUserName')
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(400);
  });
  it('Should not authorize the user', async () => {
    const res = await request(app).get(
      `/api/user/${usernamePar}`,
    );
    expect(res.statusCode).toEqual(401);
  });
});
