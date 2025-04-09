const router = require( 'express' ).Router();

const NotFoundError = require( '../utils/errors/not-found' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

const { createUser, login } = require( '../controllers/users' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.post( '/signin', login );
router.post( '/signup', createUser );

router.use(( req, res, next) => {
	next(new NotFoundError);
})

module.exports = router;
