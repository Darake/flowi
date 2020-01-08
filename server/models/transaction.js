const mongoose = require('mongoose');
const createModel = require('./modelFactory');

const transactionSchema = mongoose.Schema({
  sourceAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  targetAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  targetCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  amount: {
    type: Number,
    required: true
  }
});

const Transaction = createModel('Transaction', transactionSchema);

module.exports = Transaction;
