module.exports = {
	BAD_REQUEST: { code: 400, message: 'invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.' },
	NOT_FOUND: { code: 404, message: 'there is no user or clothing item with the requested id, or the request was sent to a non-existent address.' },
	DEFAULT: { code: 500, message: 'An error has occurred on the server.' }
}
