const testingRouter = require('express').Router();
const { connectToDB, connectToTestingDB } = require('../database');
const { clearTestDB, initTestData } = require('../services/testService');

testingRouter.post('/reset', async (req, res) => {
  await clearTestDB();
  await initTestData();
  res.status(204).end();
});

testingRouter.post('/setup', async (req, res) => {
  await connectToTestingDB();
  res.status(204).end();
});

testingRouter.post('/cleanup', async (req, res) => {
  await connectToDB();
  res.status(204).end();
});

module.exports = testingRouter;
