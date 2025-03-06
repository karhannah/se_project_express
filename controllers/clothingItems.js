const Item = require( '../models/clothingItem' );
const Error = require( '../utils/errors' );

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
				return res.status( 400 ).send( Error.ERR_400_BADPARAMS );
			} else {
				return res.status( 500 ).send( Error.ERR_500_INTERNAL );
			}
		});
};

const getItems = ( req, res ) => {
	Item.find({})
		.then(( items ) => res.status( 200 ).send({ items }))
		.catch(( err ) => {
			console.error( err );
			return res.status( 500 ).send( Error.ERR_500_INTERNAL );
		});
};

const deleteItem = ( req, res ) => {
	const { itemId } = req.params;

	Item.findByIdAndDelete( itemId )
		.orFail()
		.then(( item ) => res.status( 200 ).send({ message: 'Item successfully deleted' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( 400 ).send( Error.ERR_400_BADPARAMS );
			} else if ( err.name === "DocumentNotFoundError" ) {
				return res.status( 404 ).send( Error.ERR_404_NOTFOUND );
			} else {
				return res.status( 500 ).send( Error.ERR_500_INTERNAL );
			}
		});
};

const likeItem = ( req, res ) => {
	const { itemId } = req.params;

	Item.findByIdAndUpdate( itemId, { $addToSet: { likes: req.user._id } }, { new: true } )
		.orFail()
		.then(( item ) => res.status( 200 ).send({ message: 'Item liked successfully' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( 400 ).send( Error.ERR_400_BADPARAMS );
			} else if ( err.name === "DocumentNotFoundError" ) {
				return res.status( 404 ).send( Error.ERR_404_NOTFOUND );
			} else {
				return res.status( 500 ).send( Error.ERR_500_INTERNAL );
			}
		});
};

const dislikeItem = ( req, res ) => {
	const { itemId } = req.params;

	Item.findByIdAndUpdate( itemId, { $pull: { likes: req.user._id } }, { new: true })
		.orFail()
		.then(( item ) => res.status( 200 ).send({ message: 'Item disliked successfully' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( 400 ).send( Error.ERR_400_BADPARAMS );
			} else if ( err.name === "DocumentNotFoundError" ) {
				return res.status( 404 ).send( Error.ERR_404_NOTFOUND );
			} else {
				return res.status( 500 ).send( Error.ERR_500_INTERNAL );
			}
		});
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
