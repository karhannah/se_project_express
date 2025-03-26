const fs = require( 'fs' );

module.exports = {
	JWT_SECRET: fs.readFileSync('private.pem'),
}
