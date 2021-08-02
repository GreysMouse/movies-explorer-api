const { CORS_ALLOWED_URLS, CORS_ALLOWED_METHODS, CORS_ALLOWED_HEADERS } = require('../config');

const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (CORS_ALLOWED_URLS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', CORS_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', CORS_ALLOWED_HEADERS);
      res.status(204).send();
    } else next();
  } else next();
};

module.exports = cors;
