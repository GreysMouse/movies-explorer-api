const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH } = require('../constants/constraints');
const { getUser, updateUser } = require('../controllers/user');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(USER_NAME_MIN_LENGTH).max(USER_NAME_MAX_LENGTH),
  }),
}), updateUser);

module.exports = router;
