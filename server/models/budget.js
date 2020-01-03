const mongoose = require('mongoose');
const createModel = require('./modelFactory');

const budgetSchema = mongoose.Schema({
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

const Budget = createModel('Budget', budgetSchema);

module.exports = Budget;
