const router = require( 'express' ).Router();
const Error = require( '../utils/errors' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.use(( req, res ) => {
	res.status( Error.NOT_FOUND.code ).send( Error.NOT_FOUND.message );
})

module.exports = router;
