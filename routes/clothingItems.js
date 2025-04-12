const router = require( 'express' ).Router();
const { validateItemBody, validateId } = require('../middleware/validation');

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require( '../controllers/clothingItems' );
const auth = require( '../middleware/auth' );

router.get( '/', getItems );
router.post( '/', auth, createItem );
router.delete( '/:itemId', validateId, deleteItem );

router.put( '/:itemId/likes', validateId, likeItem );
router.delete( '/:itemId/likes', validateId, dislikeItem );

module.exports = router;
