const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

accountSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
