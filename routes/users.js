const router = require( 'express' ).Router();

const auth = require( '../middleware/auth' );

const { getCurrentUser, updateUser } = require( '../controllers/users' );

router.get(( '/me' ), getCurrentUser ).use( auth );
router.patch(( '/me' ), updateUser ).use( auth );

module.exports = router;
