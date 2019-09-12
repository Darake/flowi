const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Account = require('../models/account');
const User = require('../models/user');
const { accountsInDb, createUser, userToken } = require('./test_helper');

const api = supertest(app);

const validAccount = {
  name: 'Nordea',
  balance: 500
};

let accountsAtStart;
let user;
let token;
let accountId;

beforeEach(async () => {
  await Account.deleteMany({});
  user = await createUser();
  token = await userToken(user.email);

  const accountWithoutUser = new Account({
    name: 'OP',
    balance: 71
  });
  await accountWithoutUser.save();

  const accountWithUser = new Account({
    name: 'Danske',
    balance: 9001
  });
  const savedAccount = await accountWithUser.save();
  accountId = savedAccount._id;
  user.accounts.push(accountId);
  await user.save();

  accountsAtStart = await accountsInDb();
});

describe('account', () => {
  test('created by the user are shown to the user as JSON', async () => {
    const result = await api
      .get('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.length).toBe(user.accounts.length);
  });

  test('can be created', async () => {
    await api
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccount)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const accountsAtEnd = await accountsInDb();

    expect(accountsAtEnd.length).toBe(accountsAtStart.length + 1);

    const accountNames = accountsAtEnd.map(a => a.name);
    expect(accountNames).toContain(validAccount.name);
  });

  test('id gets saved to user', async () => {
    await api
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccount);

    const savedAccount = await Account.findOne({ name: 'Nordea' });
    const userAtEnd = await User.findOne({ email: 'admin@example.com' });
    const accountIds = userAtEnd.accounts.map(a => a.toString());
    expect(accountIds).toContain(savedAccount._id.toString());
  });

  test('cant be created without a signed user', async () => {
    await api
      .post('/api/accounts')
      .send(validAccount)
      .expect(401, '{"error":"invalid token"}');

    const accountsAtEnd = await accountsInDb();
    expect(accountsAtEnd.length).toBe(accountsAtStart.length);
  });

  test('cant be created without a name', async () => {
    await api
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ balance: 0 })
      .expect(400);

    const accountsAtEnd = await accountsInDb();
    expect(accountsAtEnd.length).toBe(accountsAtStart.length);
  });

  test('cant be created without a balance', async () => {
    await api
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Nordea' })
      .expect(400);

    const accountsAtEnd = await accountsInDb();
    expect(accountsAtEnd.length).toBe(accountsAtStart.length);
  });

  test('name can be changed by owner', async () => {
    await api
      .put(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'DanskeNew', balance: 9001 })
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const editedAccount = await Account.findById(accountId);
    expect(editedAccount.name).toBe('DanskeNew');
    expect(editedAccount.balance).toBe(9001);
  });

  test('name cant be changed if not owner', async () => {
    await api
      .put(`/api/accounts/${accountId}`)
      .send({ name: 'DanskeNew', balance: 9001 })
      .expect(401, '{"error":"invalid token"}');

    const account = await Account.findById(accountId);
    expect(account.name).toBe('Danske');
    expect(account.balance).toBe(9001);
  });

  test('owner can delete the account', async () => {
    await api
      .delete(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const accountsAtEnd = await accountsInDb();

    expect(accountsAtEnd.length).toBe(accountsAtStart.length - 1);

    const accountNames = accountsAtEnd.map(a => a.name);
    expect(accountNames).not.toContain('Danske');
  });

  test('cant be deleted if not owner', async () => {
    await api.delete(`/api/accounts/${accountId}`).expect(401);

    const accountsAtEnd = await accountsInDb();
    expect(accountsAtEnd.length).toBe(accountsAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
