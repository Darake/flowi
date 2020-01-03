const transactionRouter = require('express').Router();
const Transaction = require('../models/budget');
const User = require('../models/user');
const Account = require('../models/account');
const Budget = require('../models/budget');

const updateSourceAndTarget = async (
  transactionId,
  sourceAccountId,
  targetAccountId,
  targetBudgetId,
  amount
) => {
  if (sourceAccountId) {
    const sourceAccount = await Account.findById(sourceAccountId);
    sourceAccount.transactions.concat(transactionId);
    sourceAccount.balance -= amount;
    await sourceAccount.save();
  }
  if (targetAccountId) {
    const targetAccount = await Account.findById(targetAccountId);
    targetAccount.transactions.concat(transactionId);
    targetAccount.balance += amount;
    await targetAccount.save();
  }
  if (targetBudgetId) {
    const targetBudget = await Budget.findById(targetBudgetId);
    targetBudget.balance -= amount;
    await targetBudget.save();
  }
};

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

      await updateSourceAndTarget(
        savedTransaction.id,
        sourceAccount,
        targetAccount,
        targetBudget,
        amount
      );

      response.json(savedTransaction.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = transactionRouter;
