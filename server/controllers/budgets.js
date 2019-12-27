const budgetRouter = require('express').Router();
const Budget = require('../models/budget');
const User = require('../models/user');

budgetRouter.get('/', async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const user = await User.findById(userId).populate('budgets');
      res.json(user.budgets);
    }
  } catch (exception) {
    next(exception);
  }
});

budgetRouter.post('/', async (req, res, next) => {
  const {
    body: { name, balance },
    userId
  } = req;

  try {
    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const budget = new Budget({ name, balance: balance || 0 });
      const savedBudget = await budget.save();

      const user = await User.findById(userId);
      user.budgets = user.budgets.concat(savedBudget._id);
      await user.save();

      res.json(savedBudget.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

budgetRouter.put('/:id', async (req, res, next) => {
  try {
    const {
      body: { name, balance },
      params: { id: budgetId },
      userId
    } = req;

    const user = await User.findById(userId);

    if (!req.userId || !user.budgets.includes(budgetId)) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const budget = { name, balance };
      const updatedBudget = await Budget.findByIdAndUpdate(budgetId, budget, {
        new: true
      });
      res.json(updatedBudget);
    }
  } catch (exception) {
    next(exception);
  }
});

budgetRouter.delete('/:id', async (req, res, next) => {
  try {
    const {
      params: { id: budgetId },
      userId
    } = req;

    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    }

    const user = await User.findById(userId);

    if (user.budgets.includes(budgetId)) {
      await Budget.findByIdAndRemove(budgetId);
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'invalid token' });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = budgetRouter;
