const User = require( '../models/user' );
const Error = require( '../utils/errors' );

const getUsers = ( req, res ) => {
	User.find({})
		.then( ( users ) => res.send( users ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( Error.ERR_500_INTERNAL );
		});
};

const createUser = ( req, res ) => {
	const { name, avatar } = req.body;

	User.create({ name, avatar })
		.then(( user ) => res.status( 201 ).send( user ))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "ValidationError" ) {
				return res.status( 400 ).send( Error.ERR_400_BADPARAMS );
			} else {
				return res.status( 500 ).send( Error.ERR_500_INTERNAL );
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
				return res.status( 400 ).send( Error.ERR_400_BADPARAMS );
			} else if ( err.name === "DocumentNotFoundError" ) {
				return res.status( 404 ).send( Error.ERR_404_NOTFOUND );
			} else {
				return res.status( 500 ).send( Error.ERR_500_INTERNAL );
			}
		});
};

module.exports = { getUsers, createUser, getUserById };
