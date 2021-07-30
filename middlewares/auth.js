const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const { NOT_AUTHORIZED_ERR_MSG } = require('../constants/errorMessages');

const { UnauthorizedError } = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return next(new UnauthorizedError(NOT_AUTHORIZED_ERR_MSG));

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(NOT_AUTHORIZED_ERR_MSG));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
