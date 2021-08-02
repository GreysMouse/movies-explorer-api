const mongoose = require('mongoose');
const validator = require('validator');

const { USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH } = require('../constants/constraints');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: USER_NAME_MIN_LENGTH,
    maxlength: USER_NAME_MAX_LENGTH,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
