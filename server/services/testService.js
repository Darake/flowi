const mongoose = require('mongoose');
const Account = require('../models/account');
const Category = require('../models/category');
const { createUser } = require('../services/userService');

const clearTestDB = async () => {
  await Object.keys(mongoose.connection.collections).forEach(collection =>
    mongoose.connection.collections[collection].deleteMany({})
  );
};

const initUser = async () =>
  createUser({
    email: 'admin@example.com',
    password: 'admin1',
    currency: 'EUR'
  });

const initAccounts = async user => {
  const account = await new Account({
    name: 'Nordea',
    balance: 9001
  });
  const savedAccount = await account.save();
  user.accounts.push(savedAccount._id);
};

const initCategories = async user => {
  const foodCategory = new Category({
    name: 'Food',
    balance: 0,
    user: user._id
  });
  const billsCategory = new Category({
    name: 'Bills',
    balance: 100,
    user: user._id
  });
  const savedFoodCategory = await foodCategory.save();
  const savedBillsCategory = await billsCategory.save();
  user.categories = user.categories.concat([
    savedFoodCategory._id,
    savedBillsCategory._id
  ]);
};

const initTestData = async () => {
  const user = await initUser();

  await initAccounts(user);
  await initCategories(user);

  await user.save();
};

module.exports = { clearTestDB, initTestData };
