const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../models/user');
const { userToken } = require('./test_helper');

const api = supertest(app);

const email = 'admin@example.com';
const password = 'admin';
let token;

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ email, passwordHash, currency: 'EUR' });
  await user.save();
  token = await userToken(email);
});

describe('user', () => {
  test('can login with right credentials', async () => {
    await api
      .post('/api/login')
      .send({ email, password })
      .expect(200, { token, email })
      .expect('Content-Type', /application\/json/);
  });

  test('cant login with wrong credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({ email, password: 'notadmin' })
      .expect(401);

    expect(response.body.error).toContain('invalid email or password');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
