const jwt = require( 'jsonwebtoken' );
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, CONFLICT, DEFAULT } = require( '../utils/errors' );
const { JWT_SECRET } = require( '../utils/config' );

const handleAuthError = ( res ) => {
	res.status( UNAUTHORIZED ).send({ message: UNAUTHORIZED.message });
}

module.exports.auth = ( req, res, next ) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return handleAuthError(res);
	}

	const token = extractBearerToken(authorization);
	let payload;

	try {
		payload = jwt.verify(token, JWT_SECRET);
	} catch (err) {
		return handleAuthError(res);
	}

	req.user = payload;
	
	next();
};
