const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const { usersInDb } = require('./test_helper');

const api = supertest(app);

let usersAtStart;

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({
    email: 'admin@example.com',
    password: 'admin'
  });
  await user.save();
  usersAtStart = await usersInDb();
});

describe('account', () => {
  test('can be created with fresh email', async () => {
    const newUser = {
      email: 'user@example.com',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const emails = usersAtEnd.map(u => u.email);
    expect(emails).toContain(newUser.email);
  });

  test('cant be created with taken email', async () => {
    const newUser = {
      email: 'admin@example.com',
      password: 'password'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`email` to be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
