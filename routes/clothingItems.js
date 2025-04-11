const router = require( 'express' ).Router();
const { validateItemBody, validateId } = require('../middleware/validation');

const auth = require( '../middleware/auth' );

const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require( '../controllers/clothingItems' );

router.get( '/', getItems ).use( validateItemBody );
router.post( '/', auth, createItem ).use( validateItemBody );
router.delete( '/:itemId', auth, deleteItem ).use( validateId );

router.put( '/:itemId/likes', auth, likeItem ).use( validateId );
router.delete( '/:itemId/likes', auth, dislikeItem ).use( validateId );

module.exports = router;
