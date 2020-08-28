const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../../db_handler');

let token;
let userID;

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
      userID = res.body.user.userID;
      done();
    });
});

describe('/GET User data', () => {
  it('Should get user data and return a 200', async () => {
    const res = await request(app)
      .get(`/api/user/${userID}`)
      .set({ 'x-auth-token': token });
    expect(res.statusCode).toEqual(200);
  });
  it('Should not authorize the user', async () => {
    const res = await request(app).get(`/api/user/${userID}`);
    expect(res.statusCode).toEqual(401);
  });
});
