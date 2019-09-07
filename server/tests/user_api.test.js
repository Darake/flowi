const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { usersInDb, createUser } = require('./test_helper');

const api = supertest(app);

let usersAtStart;

beforeEach(async () => {
  await createUser();
  usersAtStart = await usersInDb();
});

describe('user account', () => {
  test('can be created with fresh email', async () => {
    const newUser = {
      email: 'user@example.com',
      password: 'password',
      currency: 'EUR'
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
      email: 'Admin@example.com',
      password: 'password',
      currency: 'EUR'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toContain('email must be unique');
      });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('cant be created with invalid email format', async () => {
    const newUser = {
      email: 'notanemail',
      password: 'password',
      currency: 'EUR'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toContain('Please fill a valid email address');
      });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('cant be created without an email', async () => {
    const newUser = { password: 'password', currency: 'EUR' };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toContain('Email required');
      });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('cant be created without a password', async () => {
    const newUser = { email: 'user@example.com', currency: 'EUR' };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toContain('Invalid password');
      });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('cant be created with a password shorther than 6', async () => {
    const newUser = {
      email: 'user@example.com',
      password: 'five1',
      currency: 'EUR'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toContain('Invalid password');
      });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('cant be created without currency', async () => {
    const newUser = {
      email: 'user@example.com',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(res => {
        expect(res.body.error).toContain('Currency required');
      });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
