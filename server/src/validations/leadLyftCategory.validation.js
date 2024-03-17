const Joi = require('joi');
const createLeadLyftCategory = {
	body: Joi.object().keys({
		leadLyftCatName: Joi.string().required(),
		leadLyftCatMinScore: Joi.number().required(),
		leadLyftCatMaxScore: Joi.number().required(),
	}),
};

module.exports = {
	createLeadLyftCategory,
};
