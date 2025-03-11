const Item = require( '../models/clothingItem' );

const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require( '../utils/errors' );

const createItem = ( req, res ) => {
	const { name, weather, imageUrl } = req.body;

	Item.create({ name, weather, imageUrl, owner: req.user._id })
		.then(( item ) => {
			console.log( item );
			res.send({ data: item });
		})
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "ValidationError" ) {
				return res.status( BAD_REQUEST.code ).send( BAD_REQUEST.message );
			}
			
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

const getItems = ( req, res ) => {
	Item.find({})
		.then(( items ) => res.send({ items }))
		.catch(( err ) => {
			console.error( err );
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

const deleteItem = ( req, res ) => {
	const { itemId } = req.params;

	Item.findByIdAndDelete( itemId )
		.orFail()
		.then(() => res.status( 200 ).send({ message: 'Item successfully deleted' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( BAD_REQUEST.code ).send( BAD_REQUEST.message );
			}
			
			if ( err.name === "DocumentNotFoundError" ) {
				return res.status( NOT_FOUND.code ).send( NOT_FOUND.message );
			}
			
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

const likeItem = ( req, res ) => {
	const { itemId } = req.params;

	Item.findByIdAndUpdate( itemId, { $addToSet: { likes: req.user._id } }, { new: true } )
		.orFail()
		.then(() => res.send({ message: 'Item liked successfully' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( BAD_REQUEST.code ).send( BAD_REQUEST.message );
			}

			if ( err.name === "DocumentNotFoundError" ) {
				return res.status( NOT_FOUND.code ).send( NOT_FOUND.message );
			}
			
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

const dislikeItem = ( req, res ) => {
	const { itemId } = req.params;

	Item.findByIdAndUpdate( itemId, { $pull: { likes: req.user._id } }, { new: true })
		.orFail()
		.then(() => res.send({ message: 'Item disliked successfully' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( BAD_REQUEST.code ).send( BAD_REQUEST.message );
			}

			if ( err.name === "DocumentNotFoundError" ) {
				return res.status( NOT_FOUND.code ).send( NOT_FOUND.message );
			}
			
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
