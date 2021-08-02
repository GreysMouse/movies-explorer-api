const router = require('express').Router();

const { PAGE_NOT_FOUND_ERR_MSG } = require('../constants/errorMessages');

const { NotFoundError } = require('../errors/notFoundError');

const auth = require('../middlewares/auth');

const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const userRoute = require('./user');
const movieRouter = require('./movie');

router.use('/signup', registerRoute);
router.use('/signin', loginRoute);
router.use('/signout', logoutRoute);
router.use('/users', auth, userRoute);
router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND_ERR_MSG)));

module.exports = router;
