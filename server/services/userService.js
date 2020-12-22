const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = async ({ email, password, currency }) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    passwordHash,
    currency
  });

  const savedUser = await user.save();

  return savedUser;
};

module.exports = { createUser };
