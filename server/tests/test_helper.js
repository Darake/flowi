const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Account = require('../models/account');

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

const accountsInDb = async () => {
  const accounts = await Account.find({});
  return accounts.map(a => a.toJSON());
};

const createUser = async () => {
  await User.deleteMany({});
  const user = new User({
    email: 'admin@example.com',
    password: 'admin1',
    currency: 'EUR'
  });
  const savedUser = await user.save();
  return savedUser;
};

const userToken = async email => {
  const { _id: id } = await User.findOne({ email }).select('id');
  const userForToken = { email, id };
  return jwt.sign(userForToken, process.env.SECRET);
};

module.exports = { usersInDb, accountsInDb, createUser, userToken };
