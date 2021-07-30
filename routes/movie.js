const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { URL_REG_EXP } = require('../constants/regExps');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().positive().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REG_EXP),
    trailer: Joi.string().required().pattern(URL_REG_EXP),
    thumbnail: Joi.string().required().pattern(URL_REG_EXP),
    movieId: Joi.number().integer().positive().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().integer().positive().required(),
  }),
}), deleteMovie);

module.exports = router;
