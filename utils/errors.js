module.exports = {
	BAD_REQUEST: { code: 400, message: 'Invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.' },
	UNAUTHORIZED: { code: 401, message: 'The request could not be completed as the user is not authorized, please log in and try again.' },
	NOT_FOUND: { code: 404, message: 'There is no user or clothing item with the requested id, or the request was sent to a non-existent address.' },
	CONFLICT: { code: 409, message: 'A user with this email already exists, please log in or choose a different email.' },
	DEFAULT: { code: 500, message: 'An error has occurred on the server.' }
}
