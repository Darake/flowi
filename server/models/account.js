const mongoose = require('mongoose');
const createModel = require('./modelFactory');

const accountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  transactions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }
});

const Account = createModel('Account', accountSchema);

module.exports = Account;
