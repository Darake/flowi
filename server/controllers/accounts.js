const accountRouter = require('express').Router();
const Account = require('../models/account');
const User = require('../models/user');

accountRouter.get('/', async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const user = await User.findById(userId).populate('accounts');
      res.json(user.accounts);
    }
  } catch (exception) {
    next(exception);
  }
});

accountRouter.post('/', async (req, res, next) => {
  const {
    body: { name, balance },
    userId
  } = req;

  try {
    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const account = new Account({ name, balance, user: userId });
      const savedAccount = await account.save();

      const user = await User.findById(userId);
      user.accounts = user.accounts.concat(savedAccount._id);
      await user.save();

      res.json(savedAccount.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

accountRouter.put('/:id', async (req, res, next) => {
  try {
    const {
      body: { name, balance },
      params: { id: accountId },
      userId
    } = req;

    const user = await User.findById(userId);

    if (!req.userId || !user.accounts.includes(accountId)) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const account = { name, balance, user: userId };
      const updatedAccount = await Account.findByIdAndUpdate(
        accountId,
        account,
        { new: true }
      );
      res.json(updatedAccount);
    }
  } catch (exception) {
    next(exception);
  }
});

accountRouter.delete('/:id', async (req, res, next) => {
  try {
    const {
      params: { id: accountId },
      userId
    } = req;

    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    }

    const user = await User.findById(userId);

    if (user.accounts.includes(accountId)) {
      user.accounts = user.accounts.filter(
        account => account.toString() !== accountId
      );
      await user.save();
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'invalid token' });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = accountRouter;
