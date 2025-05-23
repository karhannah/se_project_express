const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateUrl = ( value, helpers ) => {
	if (validator.isURL(value)) {
		return value;
	}
	return helpers.error('string.uri');
}

const validateItemBody = celebrate({
	body: Joi.object().keys({
		weather: Joi.string().valid('hot', 'warm', 'cold').required(),
		name: Joi.string().required().min(2).max(30).messages({
			'string.min': 'The minimum length of the "name" field is 2',
			'string.max': 'The maximum length of the "name" field is 30',
			'string.empty': 'The "name" field must be filled in'
		}),
		imageUrl: Joi.string().required().custom(validateUrl).messages({
			'string.empty': 'The "imageUrl" field must be filled in',
			'string.uri': 'The "imageUrl" field must be a valid URL'
		})
	})
});

const validateUserUpdate = celebrate({
	body: Joi.object().keys({
		name: Joi.string().required().min(2).max(30).messages({
			'string.min': 'The minimum length of the "name" field is 2',
			'string.max': 'The maximum length of the "name" field is 30',
			'string.empty': 'The "name" field must be filled in'
		}),
		avatar: Joi.string().required().custom(validateUrl).messages({
			'string.empty': 'The "imageUrl" field must be filled in',
			'string.uri': 'The "imageUrl" field must be a valid URL'
		})
	})
})

const validateUserBody = celebrate({
	body: Joi.object().keys({
		name: Joi.string().required().min(2).max(30).messages({
			'string.min': 'The minimum length of the "name" field is 2',
			'string.max': 'The maximum length of the "name" field is 30',
			'string.empty': 'The "name" field must be filled in'
		}),
		avatar: Joi.string().required().custom(validateUrl).messages({
			'string.empty': 'The "imageUrl" field must be filled in',
			'string.uri': 'The "imageUrl" field must be a valid URL'
		}),
		email: Joi.string().required().email().messages({
			'string.empty': 'The "email" field must be filled in',
			'string.email': 'The "email" field must be a valid email'
		}),
		password: Joi.string().required().messages({
			'string.empty': 'The "password" field must be filled in'
		})
	})
});

const validateLogin = celebrate({
	body: Joi.object().keys({
		email: Joi.string().required().email().messages({
			'string.empty': 'The "email" field must be filled in',
			'string.email': 'The "email" field must be a valid email'
		}),
		password: Joi.string().required().messages({
			'string.empty': 'the "password" field must be filled in'
		})
	})
});

const validateId = celebrate({
	params: Joi.object().keys({
		itemId: Joi.string().alphanum().length(24).messages({
			'string.empty': 'The "itemId" field must be filled in',
			'string.alphanum': 'The "itemId" field must be a valid id'
		})
	})
});

module.exports = {
	validateItemBody,
	validateUserBody,
	validateUserUpdate,
	validateLogin,
	validateId
}
