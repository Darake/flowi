const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async ({ body: { email, password } }, res, next) => {
  try {
    if (!password || password.length < 6) {
      res.status(400).json({
        error: 'Invalid password'
      });
    } else {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        email,
        passwordHash
      });

      const savedUser = await user.save();

      res.json(savedUser);
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
