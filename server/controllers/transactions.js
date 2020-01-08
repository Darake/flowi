const transactionRouter = require('express').Router();
const Transaction = require('../models/transaction');
const User = require('../models/user');

const userValid = async (
  userId,
  sourceAccount,
  targetAccount,
  targetCategory
) => {
  if (!userId) {
    return false;
  }
  const user = await User.findById(userId);
  if (
    (sourceAccount && !user.accounts.includes(sourceAccount)) ||
    (targetAccount && !user.accounts.includes(targetAccount)) ||
    (targetCategory && !user.categories.includes(targetCategory))
  ) {
    return false;
  }
  return true;
};

transactionRouter.post('/', async (request, response, next) => {
  const {
    body: { sourceAccount, targetAccount, targetCategory, amount },
    userId
  } = request;
  try {
    if (!userValid(userId, sourceAccount, targetAccount, targetCategory)) {
      response.status(401).json({ error: 'invalid token' });
    } else {
      const savedTransaction = await new Transaction({
        sourceAccount,
        targetAccount,
        targetCategory,
        amount
      }).save();

      response.json(savedTransaction.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = transactionRouter;
