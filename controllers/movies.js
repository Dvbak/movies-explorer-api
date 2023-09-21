const httpConstants = require('http2').constants;
const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movieCard) => {
      res.status(httpConstants.HTTP_STATUS_CREATED).send(movieCard);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const getListMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movieCards) => res.status(httpConstants.HTTP_STATUS_OK).send(movieCards))
    .catch((err) => next(err));
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movieCard) => {
      if (!movieCard) {
        throw new NotFoundError('Карточка по данному _id не найдена');
      } else if (!movieCard.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить карточку другого пользователя');
      }
      Movie.deleteOne(movieCard)
        .orFail()
        .then(() => {
          res.status(httpConstants.HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Неправильный _id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  addMovie,
  getListMovies,
  deleteMovieById,
};
