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
  targetBudget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget'
  },
  amount: {
    type: Number,
    required: true
  }
});

const Transaction = createModel('Transaction', transactionSchema);

module.exports = Transaction;
