const transactionRouter = require('express').Router();
const Transaction = require('../models/transaction');
const User = require('../models/user');
const Account = require('../models/account');
const Category = require('../models/category');

const updateUser = async (userId, transactionId) => {
  const user = await User.findById(userId);
  user.transactions = user.transactions.concat(transactionId);
  await user.save();
};

const updateSourceAndTarget = async (
  sourceAccountId,
  targetAccountId,
  targetBudgetId,
  amount
) => {
  if (sourceAccountId) {
    const sourceAccount = await Account.findById(sourceAccountId);
    sourceAccount.balance -= amount;
    await sourceAccount.save();
  }
  if (targetAccountId) {
    const targetAccount = await Account.findById(targetAccountId);
    targetAccount.balance += amount;
    await targetAccount.save();
  }
  if (targetBudgetId) {
    const targetBudget = await Category.findById(targetBudgetId);
    targetBudget.balance -= amount;
    await targetBudget.save();
  }
};

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

transactionRouter.get('/', async (request, response, next) => {
  try {
    const { userId } = request;
    if (!userId) {
      response.status(401).json({ error: 'invalid token' });
    } else {
      const user = await User.findById(userId).populate({
        path: 'transactions',
        populate: [
          { path: 'sourceAccount' },
          { path: 'targetCategory' },
          { path: 'targetAccount' }
        ]
      });
      console.log(user.transactions);
      response.json(user.transactions);
    }
  } catch (exception) {
    next(exception);
  }
});

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

      await updateSourceAndTarget(
        sourceAccount,
        targetAccount,
        targetCategory,
        amount
      );

      await updateUser(userId, savedTransaction.id);

      response.json(savedTransaction.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = transactionRouter;
