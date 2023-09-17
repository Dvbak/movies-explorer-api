const jwt = require('jsonwebtoken');

// const { NODE_ENV, SECRET_KEY } = process.env;
const { SECRET_KEY } = require('../utils/config');
const UnautorizedError = require('../errors/UnautorizedError');

console.log(SECRET_KEY);
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnautorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      // NODE_ENV === 'production' ? SECRET_KEY : 'secret signature key',
      SECRET_KEY,
    );
  } catch (err) {
    return next(new UnautorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
