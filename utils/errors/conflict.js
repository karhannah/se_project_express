export default class ConflictError extends Error {
	constructor() {
		super('A user with this email already exists, please log in or choose a different email.');
		this.errorCode = 409;
	}
};
