const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const {
  PORT,
  MONGO_URL,
  MONGO_CONNECT_OPTIONS,
  RATE_LIMIT_SETTINGS,
} = require('./config');

const { errorHandler, celebrateErrorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const cors = require('./middlewares/cors');
const routes = require('./routes/index');

const app = express();

app.use(rateLimit(RATE_LIMIT_SETTINGS));

app.use(helmet());
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(errorHandler);

mongoose.connect(MONGO_URL, MONGO_CONNECT_OPTIONS);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
