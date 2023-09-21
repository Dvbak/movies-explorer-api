const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
};
