const router = require('express').Router();
const User = require('../models/user');

router.post('/reset', async (req, res) => {
  await User.deleteMany({});
  res.status(204).end();
});
