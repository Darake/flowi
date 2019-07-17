const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const { usersInDb } = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({
    username: 'admin',
    password: 'admin',
    email: 'admin@example.com'
  });
  await user.save();
});

describe('account', () => {
  test('can be created with fresh username', async () => {
    const usersAtStart = usersInDb();
    const newUser = {
      username: 'user',
      password: 'password',
      email: 'user@example.com'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = usersInDb();

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
