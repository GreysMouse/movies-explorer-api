const { JWT_COOKIE_NAME } = require('../constants/cookies');

const logout = (req, res) => res.clearCookie(JWT_COOKIE_NAME).send();

module.exports = logout;
