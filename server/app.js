const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    if (process.env.NODE_ENV !== 'test') {
      logger.error('error connection to MongoDb:', error.message);
    }
  });

app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

module.exports = app;
