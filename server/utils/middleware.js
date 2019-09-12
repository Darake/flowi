const jwt = require('jsonwebtoken');
const logger = require('./logger');

const getTokenIdFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken.id;
  }
  return null;
};

const userIdExtractor = (req, res, next) => {
  req.userId = getTokenIdFrom(req);
  next();
};

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: 'invalid token'
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userIdExtractor
};
