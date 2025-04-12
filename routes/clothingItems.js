const router = require( 'express' ).Router();
const { validateItemBody, validateId } = require('../middleware/validation');

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require( '../controllers/clothingItems' );

router.get( '/', getItems );
router.post( '/', validateItemBody, createItem );
router.delete( '/:itemId', validateId, deleteItem );

router.put( '/:itemId/likes', validateId, likeItem );
router.delete( '/:itemId/likes', validateId, dislikeItem );

module.exports = router;
