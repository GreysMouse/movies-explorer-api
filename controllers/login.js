const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT_SECRET, TOKEN_OPTIONS, COOKIE_OPTIONS } = require('../config');
const { JWT_COOKIE_NAME } = require('../constants/cookies');
const { INVALID_REQUEST_ERR_MSG, INVALID_USER_CREDENTIALS_ERR_MSG } = require('../constants/errorMessages');

const { InvalidRequestError } = require('../errors/invalidRequestError');
const { UnauthorizedError } = require('../errors/unauthorizedError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError(INVALID_USER_CREDENTIALS_ERR_MSG);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError(INVALID_USER_CREDENTIALS_ERR_MSG);

          const token = jwt.sign({ _id: user._id }, JWT_SECRET, TOKEN_OPTIONS);

          res.cookie(JWT_COOKIE_NAME, token, COOKIE_OPTIONS).send({ name: user.name, email });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new InvalidRequestError(INVALID_REQUEST_ERR_MSG));
      return next(err);
    });
};

module.exports = login;
