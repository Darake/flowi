const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const connect = uri => {
  logger.info('connecting to', uri);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch(error => {
      logger.error('error connection to MongoDb:', error.message);
    });
};

const connectToDB = () => connect(config.MONGODB_URI);

const connectToTestingDB = () => connect(config.MONGODB_TESTING_URI);

module.exports = { connectToDB, connectToTestingDB };
