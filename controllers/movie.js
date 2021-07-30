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

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id }).select('-_id')
  .then((list) => res.send(list))
  .catch(next);

const createMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.body.movieId })
    .then((movie) => {
      if (movie) throw new ConflictError(UNIQUE_MOVIE_REGISTER_ERR_MSG);
      return Movie.create({ ...req.body, owner: req.user._id });
    })
    .then((movie) => res.send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      owner: movie.owner,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new InvalidRequestError(INVALID_REQUEST_ERR_MSG));
      else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .orFail(() => new NotFoundError(MOVIE_NOT_FOUND_ERR_MSG))
    .then((movie) => {
      // eslint-disable-next-line eqeqeq
      if (movie.owner == req.user._id) return movie;
      throw new ForbiddenError(NO_ACCESS_ERR_MSG);
    })
    .then(() => Movie.findOneAndRemove({ movieId: req.params.movieId }).select('-_id'))
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };