const Item = require( '../models/clothingItem' );

const BadRequestError = require( '../utils/errors/bad-request' );
const ForbiddenError = require( '../utils/errors/forbidden' );
const NotFoundError = require( '../utils/errors/not-found' );

const createItem = ( req, res, next ) => {
	const { name, weather, imageUrl } = req.body;

	Item.create({ name, weather, imageUrl, owner: req.user._id, likes: [] })
		.then(( item ) => res.send(item))
		.catch(( err ) => {
			if ( err.name === "ValidationError" ) {
				next(new BadRequestError);
			}
			
			next(err);
		});
};

const getItems = ( req, res, next ) => {
	Item.find({})
		.then(( items ) => res.send( items ))
		.catch(next);
};

const deleteItem = ( req, res, next ) => {
	const { itemId } = req.params;

	Item.findOne({ _id: itemId })
		.orFail()
		.then(( item ) => {
			if ( String( item.owner ) === req.user._id ) {
				item.deleteOne()
					.then(() => res.status( 200 ).send({ message: 'Item successfully deleted' }) )
				    .catch(next);
			} else {
				next(new ForbiddenError);
			}
		})
		.catch(( err ) => {
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				next(new BadRequestError);
			}
			
			if ( err.name === "DocumentNotFoundError" ) {
				next(new NotFoundError);
			}
			
			next(err);
		});
};

const likeItem = ( req, res, next ) => {
	const { itemId } = req.params;

	Item.findByIdAndUpdate( itemId, { $addToSet: { likes: req.user._id } }, { new: true } )
		.orFail()
		.then(( item ) => res.send( item ))
		.catch(( err ) => {
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				next(new BadRequestError);
			}

			if ( err.name === "DocumentNotFoundError" ) {
				next(new NotFoundError);
			}
			
			next(err);
		});
};

const dislikeItem = ( req, res, next ) => {
	const { itemId } = req.params;

	Item.findByIdAndUpdate( itemId, { $pull: { likes: req.user._id } }, { new: true })
		.orFail()
		.then(( item ) => res.send( item ))
		.catch(( err ) => {
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				next(new BadRequestError);
			}

			if ( err.name === "DocumentNotFoundError" ) {
				next(new NotFoundError);
			}
			
			next(err);
		});
};

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
