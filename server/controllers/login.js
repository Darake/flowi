const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async ({ body: { email, password } }, res) => {
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (user && passwordCorrect) {
    const userForToken = {
      email,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({ token, email });
  } else {
    res.status(401).json({
      error: 'invalid email or password'
    });
  }
});

module.exports = loginRouter;
