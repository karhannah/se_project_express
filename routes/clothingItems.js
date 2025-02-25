const router = require( 'express' ).Router();

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require( '../controllers/clothingItems.js' );

router.get( '/', getItems );
router.post( '/', createItem );
router.delete( '/:itemId', deleteItem );

router.put( '/items/:itemId/likes', likeItem );
router.delete( '/items/:itemId/likes', dislikeItem );

module.exports = router;
