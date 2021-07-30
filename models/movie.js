const mongoose = require('mongoose');

const { URL_REG_EXP } = require('../constants/regExps');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REG_EXP.test(link),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REG_EXP.test(link),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REG_EXP.test(link),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
