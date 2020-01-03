const mongoose = require('mongoose');
const createModel = require('./modelFactory');

const transactionSchema = mongoose.Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  target: {
    type: Object,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Transaction = createModel('Transaction', transactionSchema);

module.exports = Transaction;
