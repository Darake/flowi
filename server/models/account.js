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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Account = createModel('Account', accountSchema);

module.exports = Account;
