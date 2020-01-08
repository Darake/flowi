const categoryRouter = require('express').Router();
const Category = require('../models/category');
const User = require('../models/user');

categoryRouter.get('/', async (req, res, next) => {
  try {
    const { userId } = req;
    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const user = await User.findById(userId).populate('categories');
      res.json(user.categories);
    }
  } catch (exception) {
    next(exception);
  }
});

categoryRouter.post('/', async (req, res, next) => {
  const {
    body: { name, balance },
    userId
  } = req;

  try {
    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const category = new Category({
        name,
        balance: balance || 0,
        user: userId
      });
      const savedCategory = await category.save();

      const user = await User.findById(userId);
      user.categories = user.categories.concat(savedCategory._id);
      await user.save();

      res.json(savedCategory.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

categoryRouter.put('/:id', async (req, res, next) => {
  try {
    const {
      body: { name, balance },
      params: { id: categoryId },
      userId
    } = req;

    const user = await User.findById(userId);

    if (!req.userId || !user.categories.includes(categoryId)) {
      res.status(401).json({ error: 'invalid token' });
    } else {
      const category = { name, balance, user: userId };
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        category,
        {
          new: true
        }
      );
      res.json(updatedCategory);
    }
  } catch (exception) {
    next(exception);
  }
});

categoryRouter.delete('/:id', async (req, res, next) => {
  try {
    const {
      params: { id: categoryId },
      userId
    } = req;

    if (!userId) {
      res.status(401).json({ error: 'invalid token' });
    }

    const user = await User.findById(userId);

    if (user.categories.includes(categoryId)) {
      await Category.findByIdAndRemove(categoryId);
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'invalid token' });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = categoryRouter;
