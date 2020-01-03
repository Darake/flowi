const mongoose = require('mongoose');

const createModel = (name, schema) => {
  schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

  return mongoose.model(name, schema);
};

module.exports = createModel;
