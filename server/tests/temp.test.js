const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('API renders', async () => {
  await api.get('/api').expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});
