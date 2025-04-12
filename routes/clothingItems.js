const router = require( 'express' ).Router();
const { validateItemBody, validateId } = require('../middleware/validation');

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require( '../controllers/clothingItems' );
const auth = require( '../middleware/auth' );

router.get( '/', getItems );
router.post( '/', auth, validateItemBody, createItem );
router.delete( '/:itemId', auth, validateId, deleteItem );

router.put( '/:itemId/likes', auth, validateId, likeItem );
router.delete( '/:itemId/likes', auth, validateId, dislikeItem );

module.exports = router;
