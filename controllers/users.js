const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

const User = require( '../models/user' );
const { JWT_SECRET } = require( '../utils/config' );
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, CONFLICT, DEFAULT } = require( '../utils/errors' );

const createUser = ( req, res ) => {
	const { name, avatar, email, password } = req.body;

	bcrypt.hash( password, 10 ).then((hash) => {
		User.create({
			name,
			avatar,
			email,
			password: hash
		})
			.then(( user ) => {
				res.status( 201 ).send({
					name: user.name,
					avatar: user.avatar,
					email: user.email
				});
			})
			.catch(( err ) => {
				console.error( err );
				if ( err.name === "ValidationError" ) {
					return res.status( BAD_REQUEST.code ).send({ message: BAD_REQUEST.message });
				}
				if ( err.code === 11000 ) {
					return res.status( CONFLICT.code ).send({ message: CONFLICT.code });
				}
			
			return res.status( DEFAULT.code ).send({ message: DEFAULT.message }); 
		});
	});
};

const getCurrentUser = ( req, res ) => {
	const id = req.user._id;

	User.findById( id )
		.orFail()
		.then(( user ) => res.send( user ))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" ) {
				return res.status( BAD_REQUEST.code ).send({ message: BAD_REQUEST.message });
			}
			if ( err.name === "DocumentNotFoundError" ) {
				return res.status( NOT_FOUND.code ).send({ message: NOT_FOUND.message });
			}
			
			return res.status( DEFAULT.code ).send({ message: DEFAULT.message });
		});
};

const login = ( req, res ) => {
	const { email, password } = req.body;

	User.findUserByCredentials( email, password )
		.then(( user ) => {
			const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
				expiresIn: '7d'
			});

			return res.send( token );
		})
		.catch(( err ) => {
			console.error( err );
			if ( err.message === "Incorrect email or password" ) {
				return res.status( UNAUTHORIZED.code ).send({ message: UNAUTHORIZED.message });
			}
			
			return res.status( DEFAULT.code ).send({ message: DEFAULT.message });
		});
};

const updateUser = ( req, res ) => {
	const { _id, name, avatar } = req.user;

	User.findByIdAndUpdate( _id, { $set: { name, avatar }}, { runValidate: true } )
		.orFail()
		.then(() => res.send({ message: 'User profile updated successfully' }))
		.catch(( err ) => {
			console.error( err );
			if ( err.name === "CastError" || err.name === "ValidateError" ) {
				return res.status( BAD_REQUEST.code ).send({ message: BAD_REQUEST.message });
			}

			if ( err.name === "DocumentNotFoundError" ) {
				return res.status( NOT_FOUND.code ).send({ message: NOT_FOUND.message });
			}
			
			return res.status( DEFAULT.code ).send({ message: DEFAULT.message });
		});
}

module.exports = { createUser, getCurrentUser, login, updateUser };
