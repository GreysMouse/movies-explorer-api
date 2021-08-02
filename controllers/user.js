const User = require('../models/user');

const {
  INVALID_REQUEST_ERR_MSG,
  USER_NOT_FOUND_ERR_MSG,
  UNIQUE_USER_EMAIL_ERR_MSG,
} = require('../constants/errorMessages');

const { NotFoundError } = require('../errors/notFoundError');
const { ConflictError } = require('../errors/conflictError');
const { InvalidRequestError } = require('../errors/invalidRequestError');

const getUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => new NotFoundError(USER_NOT_FOUND_ERR_MSG))
  .then((user) => res.send(user))
  .catch(next);

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user && req.user._id !== user._id.toString()) {
        throw new ConflictError(UNIQUE_USER_EMAIL_ERR_MSG);
      }
      return User.findByIdAndUpdate(req.user._id, { email, name }, {
        new: true,
        runValidators: true,
      });
    })
    .then((user) => {
      if (!user) throw new NotFoundError(USER_NOT_FOUND_ERR_MSG);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new InvalidRequestError(INVALID_REQUEST_ERR_MSG));
      return next(err);
    });
};

module.exports = { getUser, updateUser };
