const router = require( 'express' ).Router();
const path = require( 'path' );

const userRouter = require( './users.js' );
const itemRouter = require( './clothingItems.js' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.use(( req, res ) => {
	res.status( 500 ).send({ message: 'Path not found' });
})

module.exports = router;
