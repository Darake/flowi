const mongoose = require('mongoose');
const Account = require('../models/account');
const Category = require('../models/category');
const Transaction = require('../models/transaction');
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
  const nordeaAccount = await new Account({
    name: 'Nordea',
    balance: 9001
  });
  const savedNordeaAccount = await nordeaAccount.save();
  const pohjolaAccount = await new Account({
    name: 'Pohjola',
    balance: 1337
  });
  const savedPohjolaAccount = await pohjolaAccount.save()
  user.accounts = user.accounts.concat([
    savedNordeaAccount._id,
    savedPohjolaAccount._id
  ]);

  return {
    nordeaAccount: savedNordeaAccount,
    pohjolaAccount: savedPohjolaAccount
  };
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

  return {
    foodCategory: savedFoodCategory,
    billsCategory: savedBillsCategory
  };
};

const initTransactions = async (
  user,
  nordeaAccountId,
  pohjolaAccountId,
  foodCategoryId
) => {
  const transaction1 = await new Transaction({
    sourceAccount: nordeaAccountId,
    targetAccount: pohjolaAccountId,
    amount: 50,
    date: new Date()
  }).save();

  const transaction2 = await new Transaction({
    sourceAccount: nordeaAccountId,
    targetCategory: foodCategoryId,
    amount: 20,
    date: new Date()
  }).save();

  user.transactions = user.transactions.concat([
    transaction1._id,
    transaction2._id
  ]);
};

const initTestData = async () => {
  const user = await initUser();

  const { nordeaAccount, pohjolaAccount } = await initAccounts(user);
  const { foodCategory } = await initCategories(user);
  await initTransactions(
    user,
    nordeaAccount._id,
    pohjolaAccount._id,
    foodCategory._id
  );

  await user.save();
};

module.exports = { clearTestDB, initTestData };
