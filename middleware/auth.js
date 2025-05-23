const jwt = require( 'jsonwebtoken' );
const UnauthorizedError = require( '../utils/errors/unauthorized' );
const { JWT_SECRET } = require( '../utils/config' );

const handleAuthError = ( next ) => next( new UnauthorizedError() );

const auth = ( req, res, next ) => {
	const { authorization } = req.headers;

	if ( !authorization || !authorization.startsWith('Bearer ') ) {
		return handleAuthError( next );
	}

	const token = authorization.replace( "Bearer ", "" );
	let payload;

	console.log( "Test" );

	try {
		payload = jwt.verify( token, JWT_SECRET );
		console.log(payload);
	} catch (err) {
		return handleAuthError( next );
	}

	req.user = payload;
	
	return next();
};

module.exports = auth;
