const mongoose = require('mongoose');
const createModel = require('./modelFactory');

const categorySchema = mongoose.Schema({
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

const Category = createModel('Category', categorySchema);

module.exports = Category;
