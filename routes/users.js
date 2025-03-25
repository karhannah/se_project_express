const router = require( 'express' ).Router();

const { getUsers, createUser, getCurrentUser, login, updateUser } = require( '../controllers/users' );

router.get(( '/users/me' ), getCurrentUser );
router.patch(( '/users/me' ), updateUser );

module.exports = router;
