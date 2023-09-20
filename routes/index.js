const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerRegistration = require('./registr');
const routerLogin = require('./login');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', routerRegistration);
router.use('/signin', routerLogin);

router.use(auth);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
