const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { addMovie, getListMovies, deleteMovieById } = require('../controllers/movies');
const { urlAddress } = require('../utils/constants');

router.get('/', getListMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlAddress),
    trailerLink: Joi.string().required().pattern(urlAddress),
    thumbnail: Joi.string().required().pattern(urlAddress),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), deleteMovieById);

module.exports = router;
