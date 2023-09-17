const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');

const { PORT, DB_URL } = require('./utils/config');

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

mongoose.connect(DB_URL);

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, address database: ${DB_URL}`);
});
