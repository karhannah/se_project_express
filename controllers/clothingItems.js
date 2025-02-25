const Item = require( '../models/clothingItem.js' );

const createItem = ( req, res ) => {
	console.log( req );
	console.log( req.body );

	const { name, weather, imageUrl } = req.body;

	Item.create({ name, weather, imageUrl })
		.then(( item ) => {
			console.log( item );
			res.send({ data: item });
		})
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "ValidationError" ) {
				return res.status( 400 ).send({ message: 'invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.' });
			} else {
				return res.status( 500 ).send({ message: 'An error has occurred on the server.' });
			}
		});
};

const getItems = ( req, res ) => {
	Item.find({})
		.then(( items ) => res.status( 200 ).send({ items }))
		.catch(( err ) => {
			console.error( err );
			return res.status( 500 ).send({ message: 'An error has occurred on the server.' });
		});
};

const deleteItem = ( req, res ) => {
	const { itemId } = req.param;

	Item.findByIdAndDelete( itemId )
		.orFail()
		.then(( item ) => res.status( 200 ).send({  }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( 400 ).send({ message: 'invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.' });
			} else if ( err.name === "DocumentNotFoundError" ) {
				return res.status( 404 ).send({ message: 'there is no user or clothing item with the requested id, or the request was sent to a non-existent address.' });
			} else {
				return res.status( 500 ).send({ message: 'An error has occurred on the server.' });
			}
		});
};

const likeItem = ( req, res ) => Item.findByIdAndUpdate(
	req.params.itemId,
	{ $addToSet: { likes: req.user._id } },
	{ new: true }
);

const dislikeItem = ( req, res ) => Item.findByIdAndUpdate(
	req.params.itemId,
	{ $pull: { likes: req.user._id } },
	{ new: true }
);

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
