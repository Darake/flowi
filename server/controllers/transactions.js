const transactionRouter = require('express').Router();
const Transaction = require('../models/transaction');
const User = require('../models/user');

const userValid = async (
  userId,
  sourceAccount,
  targetAccount,
  targetBudget
) => {
  if (!userId) {
    return false;
  }
  const user = await User.findById(userId);
  if (
    (sourceAccount && !user.accounts.includes(sourceAccount)) ||
    (targetAccount && !user.accounts.includes(targetAccount)) ||
    (targetBudget && !user.budgets.includes(targetBudget))
  ) {
    return false;
  }
  return true;
};

transactionRouter.post('/', async (request, response, next) => {
  const {
    body: { sourceAccount, targetAccount, targetBudget, amount },
    userId
  } = request;
  try {
    if (!userValid(userId, sourceAccount, targetAccount, targetBudget)) {
      response.status(401).json({ error: 'invalid token' });
    } else {
      const savedTransaction = await new Transaction({
        sourceAccount,
        targetAccount,
        targetBudget,
        amount
      }).save();

      response.json(savedTransaction.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = transactionRouter;
