const router = require( 'express' ).Router();
const { NOT_FOUND } = require( '../utils/errors' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

const { createUser, login } = require( '../controllers/users' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.post( '/signin', login );
router.post( '/signup', createUser );

router.use(( req, res ) => {
	res.status( NOT_FOUND.code ).send({ message: NOT_FOUND.message });
})

module.exports = router;
