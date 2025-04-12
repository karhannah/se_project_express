const router = require( 'express' ).Router();
const auth = require( '../middleware/auth' );

const { validateUserBody } = require('../middleware/validation');
const { getCurrentUser, updateUser } = require( '../controllers/users' );

router.get( '/me', auth, getCurrentUser );
router.patch( '/me', auth, validateUserBody, updateUser );

module.exports = router;
