const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regPassword } = require('../utils/constants');
const { login } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regPassword),
  }),
}), login);

module.exports = router;
