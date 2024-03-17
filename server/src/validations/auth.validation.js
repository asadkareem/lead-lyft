const Joi = require('joi');
const { password } = require('./custom.validation');
const { Role } = require('@prisma/client');
// const {Role} = requi

const register = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		firstName: Joi.string().required(),
		lastName: Joi.string(),
		password: Joi.string().required(),
		// userType: Joi.string(),
		departmentId: Joi.number(),
		role: Joi.string().valid(
			Role.CLIENT,
			Role.ADMIN,
			Role.COACH,
			Role.CORPORATE
		),
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const logout = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

const refreshTokens = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

const forgotPassword = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
	}),
};

const resetPassword = {
	query: Joi.object().keys({
		token: Joi.string().required(),
	}),
	body: Joi.object().keys({
		password: Joi.string().required().custom(password),
	}),
};

const verifyEmail = {
	query: Joi.object().keys({
		token: Joi.string().required(),
	}),
};

module.exports = {
	register,
	login,
	logout,
	refreshTokens,
	forgotPassword,
	resetPassword,
	verifyEmail,
};
