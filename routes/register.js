const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { EMAIL_REG_EXP } = require('../constants/regExps');
const { USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH, USER_PASSWORD_MIN_LENGTH } = require('../constants/constraints');

const register = require('../controllers/register');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REG_EXP),
    password: Joi.string().required().min(USER_PASSWORD_MIN_LENGTH),
    name: Joi.string().required().min(USER_NAME_MIN_LENGTH).max(USER_NAME_MAX_LENGTH),
  }),
}), register);

module.exports = router;
