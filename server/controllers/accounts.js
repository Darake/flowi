const accountRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const User = require('../models/user');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

accountRouter.post('/', async (req, res, next) => {
  const token = getTokenFrom(req);
  const { name, balance } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      res.status(401).json({ error: 'token missing or invalid' });
    } else {
      const account = new Account({ name, balance });
      const savedAccount = await account.save();

      const user = await User.findById(decodedToken.id);
      user.accounts = user.accounts.concat(savedAccount._id);
      await user.save();

      res.json(savedAccount.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

accountRouter.delete('/:id', async (req, res, next) => {
  const token = getTokenFrom(req);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = User.findById(decodedToken.id);

    await Account.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = accountRouter;
