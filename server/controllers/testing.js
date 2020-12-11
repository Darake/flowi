const testingRouter = require('express').Router();
const User = require('../models/user');
const { connectToDB, connectToTestingDB } = require('../database');

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany({});
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
