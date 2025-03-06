const router = require( 'express' ).Router();
const path = require( 'path' );

const userRouter = require( './users' );
const itemRouter = require( './clothingItems' );

router.use( '/users', userRouter );
router.use( '/items', itemRouter );

router.use(( req, res ) => {
	res.status( 404 ).send({ message: 'Path not found' });
})

module.exports = router;
