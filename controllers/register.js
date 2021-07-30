const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { JWT_SALT_ROUNDS } = require('../config');
const { INVALID_REQUEST_ERR_MSG, UNIQUE_USER_REGISTER_ERR_MSG } = require('../constants/errorMessages');

const { ConflictError } = require('../errors/conflictError');
const { InvalidRequestError } = require('../errors/invalidRequestError');

const register = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) throw new ConflictError(UNIQUE_USER_REGISTER_ERR_MSG);
      return bcrypt.hash(password, JWT_SALT_ROUNDS);
    })
    .then((hash) => User.create({ email, password: hash, name }))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new InvalidRequestError(INVALID_REQUEST_ERR_MSG));
      return next(err);
    });
};

module.exports = register;
