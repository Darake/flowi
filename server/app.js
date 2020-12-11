const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connectToDB } = require('./database')
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const accountRouter = require('./controllers/accounts');
const categoryRouter = require('./controllers/categories');
const transactionRouter = require('./controllers/transactions');
const testingRouter = require('./controllers/testing');

const app = express();

connectToDB();

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.userIdExtractor);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionRouter);

if (process.env.NODE_ENV === 'development') {
  app.use('/api/testing', testingRouter);
}

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, 'build/index.html'), err => {
    if (err) {
      response.status(500).send(err);
    }
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
