class BadRequestError extends Error {
	constructor() {
		super('Invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.');
		this.statusCode = 400;
	}
};

module.exports = BadRequestError;
