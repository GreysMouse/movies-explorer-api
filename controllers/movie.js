const mongoose = require('mongoose');

const Movie = require('../models/movie');

const {
  INVALID_REQUEST_ERR_MSG,
  MOVIE_NOT_FOUND_ERR_MSG,
  NO_ACCESS_ERR_MSG,
  UNIQUE_MOVIE_REGISTER_ERR_MSG,
} = require('../constants/errorMessages');

const { InvalidRequestError } = require('../errors/invalidRequestError');
const { NotFoundError } = require('../errors/notFoundError');
const { ForbiddenError } = require('../errors/forbiddenError');
const { ConflictError } = require('../errors/conflictError');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((list) => res.send(list))
  .catch(next);

const createMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.body.movieId })
    .then((movie) => {
      if (movie) throw new ConflictError(UNIQUE_MOVIE_REGISTER_ERR_MSG);
      return Movie.create({ ...req.body, owner: req.user._id });
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new InvalidRequestError(INVALID_REQUEST_ERR_MSG));
      else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    throw new InvalidRequestError(INVALID_REQUEST_ERR_MSG);
  }

  Movie.findOne({ _id: req.params.movieId })
    .orFail(() => new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) return movie;
      throw new ForbiddenError(NO_ACCESS_ERR_MSG);
    })
    .then((movie) => Movie.findOneAndRemove({ _id: movie._id }))
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
