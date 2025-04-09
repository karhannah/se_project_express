export default class NotFoundError extends Error {
	constructor() {
		super('There is no user or clothing item with the requested id, or the request was sent to a non-existent address.');
		this.errorCode = 404;
	}
};
