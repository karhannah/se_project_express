const router = require( 'express' ).Router();
const Error = require( '../utils/errors' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

const { getUsers, createUser, getUserById, login } = require( '../controllers/users' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.post( '/signin', login );
router.post( '/signup', createUser );

router.use(( req, res ) => {
	res.status( Error.NOT_FOUND.code ).send( Error.NOT_FOUND.message );
})

module.exports = router;
