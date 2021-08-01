const { isCelebrateError } = require('celebrate');

const { INVALID_REQUEST_ERR_MSG } = require('../constants/errorMessages');

const celebrateErrorHandler = (err, req, res, next) => {
  if (!isCelebrateError(err)) return next(err);
  return res.status(400).send({
    message: INVALID_REQUEST_ERR_MSG,
  });
};

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (!err) return next();

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
};

module.exports = { errorHandler, celebrateErrorHandler };
