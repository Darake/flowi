const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Account = require('../models/account');
const { accountsInDb } = require('./test_helper');

const api = supertest(app);

let accountsAtStart;

beforeEach(async () => {
  await Account.deleteMany({});
  const account = new Account({
    name: 'Danske',
    balance: 9001
  });
  await account.save();
  accountsAtStart = await accountsInDb();
});

describe('account', () => {
  test('can be created', async () => {
    const newAccount = {
      name: 'Nordea',
      balance: 500
    };

    await api
      .post('/api/accounts')
      .send(newAccount)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const accountsAtEnd = await accountsInDb();

    expect(accountsAtEnd.length).toBe(accountsAtStart.length + 1);

    const accountNames = accountsAtEnd.map(a => a.name);
    expect(accountNames).toContain(newAccount.name);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
