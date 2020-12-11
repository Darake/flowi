require('dotenv').config();

const { PORT, MONGODB_URI, MONGODB_TESTING_URI } = process.env;

module.exports = {
  MONGODB_URI,
  MONGODB_TESTING_URI,
  PORT
};
