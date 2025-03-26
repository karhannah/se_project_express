const router = require( 'express' ).Router();

const auth = require( '../middleware/auth' );

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require( '../controllers/clothingItems' );

router.get( '/', getItems );
router.post( '/', createItem ).use( auth );
router.delete( '/:itemId', deleteItem ).use( auth );

router.put( '/:itemId/likes', likeItem ).use( auth );
router.delete( '/:itemId/likes', dislikeItem ).use( auth );

module.exports = router;
