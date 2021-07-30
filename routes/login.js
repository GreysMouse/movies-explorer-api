const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { EMAIL_REG_EXP } = require('../constants/regExps');

const login = require('../controllers/login');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REG_EXP),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
