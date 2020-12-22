const usersRouter = require('express').Router();
const { createUser } = require('../services/userService')

usersRouter.post('/', async (req, res, next) => {
  try {
    const {
      body: { email, password, currency }
    } = req;

    if (!password || password.length < 6) {
      res.status(400).json({
        error: 'Invalid password'
      });
    } else {
      const newUser = await createUser({ email, password, currency });

      res.json(newUser);
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
