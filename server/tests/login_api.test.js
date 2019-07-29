const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const email = 'admin@example.com';
const password = 'admin';

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ email, passwordHash });
  await user.save();
});

describe('user', () => {
  test('can login with right credentials', async () => {
    const { _id: id } = await User.findOne({ email }).select('id');

    const userForToken = { email, id };

    const token = jwt.sign(userForToken, process.env.SECRET);

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
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('invalid email or password');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
