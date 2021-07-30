const mongoose = require('mongoose');

const { EMAIL_REG_EXP } = require('../constants/regExps');
const { USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH } = require('../constants/constraints');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => EMAIL_REG_EXP.test(email),
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: USER_NAME_MIN_LENGTH,
    maxlength: USER_NAME_MAX_LENGTH,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
