const mongoose = require('mongoose');

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

budgetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
