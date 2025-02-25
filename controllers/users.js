const User = require( '../models/user.js' );

const getUsers = ( req, res ) => {
	User.find({})
		.then( ( users ) => res.send( users ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send({ message: 'default error. Accompanied by the message: "An error has occurred on the server.' });
		});
};

const createUser = ( req, res ) => {
	const { name, avatar } = req.body;

	User.create({ name, avatar })
		.then(( user ) => res.status( 201 ).send( user ))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "ValidationError" ) {
				return res.status( 400 ).send({ message: 'invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.' })
			} else {
				return res.status( 500 ).send({ message: 'default error. Accompanied by the message: "An error has occurred on the server.' });
			}
		});
};

const getUserById = ( req, res ) => {
	const id = req.params.userId;

	User.findById( id )
		.then(( user ) => res.status( 200 ).res.send( user ))
		.orFail()
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" ) {
				return res.status( 400 ).send({ message: 'invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.' });
			} else if ( err.name === "DocumentNotFoundError" ) {
				return res.status( 404 ).send({ message: 'there is no user or clothing item with the requested id, or the request was sent to a non-existent address.' });
			} else {
				return res.status( 500 ).send({ message: 'default error. Accompanied by the message: "An error has occurred on the server.' });
			}
		});
};

module.exports = { getUsers, createUser, getUserById };
