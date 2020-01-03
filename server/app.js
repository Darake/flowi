const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const accountRouter = require('./controllers/accounts');
const budgetRouter = require('./controllers/budgets');
const testingRouter = require('./controllers/testing');

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
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

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.userIdExtractor);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/budgets', budgetRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/reset', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
