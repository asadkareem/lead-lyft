// clientActionValidation
const { actionStatus } = require('./custom.validation');
const Joi = require('joi');
const createAction = {
	body: Joi.object().keys({
		// actionName:Joi.str
		actionName: Joi.string().required(),
		dueDate: Joi.date().required(),
		actionCategoryId: Joi.number().required(),
		note: Joi.string(),
	}),
};
const updateCientActionStatus = {
	body: Joi.object().keys({
		// actionName:Joi.str
		actionStatus: Joi.string().required().custom(actionStatus),
	}),
	params: Joi.object().keys({
		actionId: Joi.number().required(),
	}),
};

module.exports = {
	createAction,
	updateCientActionStatus,
};
