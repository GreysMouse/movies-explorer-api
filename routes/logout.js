const router = require('express').Router();

const logout = require('../controllers/logout');

router.post('/', logout);

module.exports = router;
