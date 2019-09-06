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

module.exports = { usersInDb, accountsInDb };
