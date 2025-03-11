const User = require( '../models/user' );
const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require( '../utils/errors' );

const getUsers = ( req, res ) => {
	User.find({})
		.then( ( users ) => res.send( users ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

const createUser = ( req, res ) => {
	const { name, avatar } = req.body;

	User.create({ name, avatar })
		.then(( user ) => res.status( 201 ).send( user ))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "ValidationError" ) {
				return res.status( BAD_REQUEST.code ).send( BAD_REQUEST.message );
			}
			
			return res.status( DEFAULT.code ).send( DEFAULT.message ); 
		});
};

const getUserById = ( req, res ) => {
	const id = req.params.userId;

	User.findById( id )
		.orFail()
		.then(( user ) => res.send( user ))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" ) {
				return res.status( BAD_REQUEST.code ).send( BAD_REQUEST.message );
			}

			if ( err.name === "DocumentNotFoundError" ) {
				return res.status( NOT_FOUND.code ).send( NOT_FOUND.message );
			}
			
			return res.status( DEFAULT.code ).send( DEFAULT.message );
		});
};

module.exports = { getUsers, createUser, getUserById };
