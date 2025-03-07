const router = require( 'express' ).Router();
const path = require( 'path' );
const Error = require( '../utils/errors' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.use(( req, res ) => {
	res.status( 404 ).send( Error.ERR_404_NOTFOUND );
})

module.exports = router;
