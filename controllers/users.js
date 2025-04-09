const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

const User = require( '../models/user' );
const { JWT_SECRET } = require( '../utils/config' );

const BadRequestError = require( '../utils/errors/bad-request' );
const UnauthorizedError = require( '../utils/errors/unauthorized' );
const NotFoundError = require( '../utils/errors/not-found' );
const ConflictError = require( '../utils/errors/conflict' );

const createUser = ( req, res, next ) => {
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
				if ( err.name === "ValidationError" ) {
					next(new BadRequestError);
				}
				
				if ( err.code === 11000 ) {
					next(new ConflictError);
				}
			
				next(err);
		});
	});
};

const getCurrentUser = ( req, res, next ) => {
	const id = req.user._id;

	User.findById( id )
		.orFail()
		.then(( user ) => res.send( user ))
		.catch(( err ) => {
			if ( err.name === "CastError" ) {
				next(new BadRequestError);
			}
			
			if ( err.name === "DocumentNotFoundError" ) {
				next(new NotFoundError);
			}
			
			next(err);
		});
};

const login = ( req, res, next ) => {
	const { email, password } = req.body;

	User.findUserByCredentials( email, password )
		.then(( user ) => {
			const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
				expiresIn: '7d'
			});

			return res.send({ token });
		})
		.catch(( err ) => {
			if ( err.message === "Incorrect email or password" ) {
				next(new UnauthorizedError);
			}
			
			next(err);
		});
};

const updateUser = ( req, res, next ) => {
	const { _id } = req.user;
	const { name, avatar } = req.body;

	User.findByIdAndUpdate( _id, { $set: { name, avatar }}, { runValidators: true, new: true } )
		.orFail()
		.then((user) => res.send(user))
		.catch(( err ) => {
			if ( err.name === "CastError" || err.name === "ValidationError" ) {
				next(new BadRequestError);
			}

			if ( err.name === "DocumentNotFoundError" ) {
				next(new NotFoundError);
			}
			
			next(err);
		});
}

module.exports = { createUser, getCurrentUser, login, updateUser };
