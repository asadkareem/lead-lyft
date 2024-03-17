const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const { Role } = require('@prisma/client');
const createUser = {
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
const assignClient = {
	body: Joi.object().keys({
		clientIds: Joi.array().items(Joi.number()).min(1).required(),
		coachId: Joi.number().required(),
	}),
};

const getUsers = {
	query: Joi.object().keys({
		name: Joi.string(),
		role: Joi.string(),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
};

/*

model UserProfile {
  id        String   @id @default(uuid())
  userId    String    @unique
  user      User?     @relation(fields: [userId], references: [id])
  bio       String?
  avatarUrl String?
}
*/

const updateUser = {
	// params: Joi.object().keys({
	//   userId: Joi.required().custom(objectId),
	// }),
	body: Joi.object()
		.keys({
			email: Joi.string().email(),
			password: Joi.string().custom(password),
			bio: Joi.string(),
			avatarUrl: Joi.string(),
		})
		.min(1),
};

const deleteUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
};

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
