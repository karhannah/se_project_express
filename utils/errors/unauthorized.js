class UnauthorizedError extends Error {
	constructor() {
		super('The request could not be completed as the user is not authorized, please log in and try again.');
		this.statusCode = 401;
	}
}

module.exports = UnauthorizedError;
