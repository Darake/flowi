const accountRouter = require('express').Router();
const Account = require('../models/account');

accountRouter.post('/', async ({ body: { name, balance } }, res, next) => {
  try {
    const account = new Account({ name, balance });
    const savedAccount = await account.save();

    res.json(savedAccount);
  } catch (exception) {
    next(exception);
  }
});

module.exports = accountRouter;
