const Joi = require('joi');
const createDepartment = {
	body: Joi.object().keys({
		departmentName: Joi.string().required(),
		companyId: Joi.number(),
		companyName: Joi.string(),
	}),
};

module.exports = {
	createDepartment,
};
