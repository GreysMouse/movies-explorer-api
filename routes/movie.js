const router = require('express').Router();
const validator = require('validator');

const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().positive().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Incorrect URL');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Incorrect URL');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Incorrect URL');
    }),
    movieId: Joi.number().integer().positive().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.required(),
  }),
}), deleteMovie);

module.exports = router;
