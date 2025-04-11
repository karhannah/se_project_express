class ForbiddenError extends Error {
	constructor() {
		super('That action is forbidden, please log in as a user with the appropriate permissions and try again.');
		this.statusCode = 403;
	}
}

module.exports = ForbiddenError;
