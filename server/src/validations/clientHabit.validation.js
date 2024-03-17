const Joi = require('joi');
const createHabit = {
	body: Joi.object().keys({
		habitName: Joi.string().required(),
		habitGoalSet: Joi.number().required(),
		note: Joi.string(),
	}),
};
const recordHabitEntry = {
	params: Joi.object().keys({
		habitId: Joi.number().required(),
	}),
};

module.exports = {
	createHabit,
	recordHabitEntry,
};
