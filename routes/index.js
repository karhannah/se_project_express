const router = require( 'express' ).Router();

const NotFoundError = require( '../utils/errors/not-found' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

const { createUser, login } = require( '../controllers/users' );
const { validateLogin, validateUserBody } = require('../middleware/validation');

const auth = require( '../middleware/auth' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.post( '/signin', auth, login ); // Testing
router.post( '/signup', validateUserBody, createUser );

router.use(( req, res, next) => {
	next(new NotFoundError);
})

module.exports = router;
