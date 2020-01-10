const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const createModel = require('./modelFactory');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    uniqueCaseInsensitive: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Please fill a valid email address'
    ]
  },
  passwordHash: String,
  currency: {
    type: String,
    required: [true, 'Currency required']
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const User = createModel('User', userSchema);

module.exports = User;
