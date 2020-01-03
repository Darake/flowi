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
  }
});

const Budget = createModel('Budget', budgetSchema);

module.exports = Budget;
