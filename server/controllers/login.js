const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
  try {
    const {
      body: { email, password }
    } = req;

    const user = await User.findOne({ email });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (user && passwordCorrect) {
      const userForToken = {
        email,
        id: user._id
      };

      const token = jwt.sign(userForToken, process.env.SECRET);
      const { currency } = user;

      res.status(200).send({ token, email, currency });
    } else {
      res.status(401).json({
        error: 'invalid email or password'
      });
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;
