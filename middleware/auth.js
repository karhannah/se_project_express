const jwt = require( 'jsonwebtoken' );
const { UNAUTHORIZED } = require( '../utils/errors' );
const { JWT_SECRET } = require( '../utils/config' );

const handleAuthError = ( res ) => res.status( UNAUTHORIZED.code ).send({ message: UNAUTHORIZED.message });

const auth = ( req, res, next ) => {
	const { authorization } = req.headers;

	if ( !authorization || !authorization.startsWith('Bearer ') ) {
		return handleAuthError(res);
	}

	const token = authorization.replace( "Bearer ", "" );
	let payload;

	try {
		payload = jwt.verify( token, JWT_SECRET );
	} catch (err) {
		return handleAuthError( res );
	}

	req.user = payload;
	
	return next();
};

module.exports = auth;
