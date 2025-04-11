class ConflictError extends Error {
	constructor() {
		super('A user with this email already exists, please log in or choose a different email.');
		this.statusCode = 409;
	}
};

module.exports = ConflictError;
