require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/beatfilmsdb',
  JWT_SECRET = 'mousegreys',
  JWT_SALT_ROUNDS = 10,
} = process.env;

const MONGO_CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const CORS_ALLOWED_URLS = [];

const CORS_ALLOWED_METHODS = 'OPTIONS, GET, POST, PUT, DELETE, PATCH';
const CORS_ALLOWED_HEADERS = 'Origin, Content-Type';

const TOKEN_OPTIONS = {
  expiresIn: '7d',
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
};

const RATE_LIMIT_SETTINGS = {
  windowMs: 60 * 1000,
  max: 20,
};

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_CONNECT_OPTIONS,
  JWT_SECRET,
  JWT_SALT_ROUNDS,
  CORS_ALLOWED_URLS,
  CORS_ALLOWED_METHODS,
  CORS_ALLOWED_HEADERS,
  TOKEN_OPTIONS,
  COOKIE_OPTIONS,
  RATE_LIMIT_SETTINGS,
};
