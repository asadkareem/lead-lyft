const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
	let alreadyFoundEmail = await prisma.user.findUnique({
		where: {
			email: userBody.email,
		},
	});

	if (alreadyFoundEmail) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Email or Username already taken'
		);
	}

	//await bcrypt.hash(user.password, 8)
	const hashedPassword = await bcrypt.hash(userBody.password, 8);
	userBody['password'] = hashedPassword;

	const createdUser = await prisma.user.create({
		data: userBody,
		include: {
			department: {
				include: {
					company: true,
				},
			},
			coach: true,
		},
	});

	return createdUser;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
	console.log({
		filter,
	});

	let users = [];

	if (filter.role) {
		users = await prisma.user.findMany({
			where: {
				role: filter.role.toUpperCase(),
			},
			include: {
				department: {
					include: {
						company: true,
					},
				},
				coach: true,
				clients: true,
			},
		});
	} else {
		users = await prisma.user.findMany({
			include: {
				department: {
					include: {
						company: true,
					},
				},
				coach: true,
				clients: true,
			},
		});
	}

	return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			department: true,
			include: {
				company: true,
			},
		},
	});
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
		include: {
			department: {
				include: {
					company: true,
				},
			},
			coach: true,
		},
	});
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}
	if (
		updateBody.email &&
		(await prisma.user.findUnique({
			where: {
				email: updateBody.email,
			},
		}))
	) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	}
	if (
		updateBody.username &&
		(await prisma.user.findUnique({
			where: {
				username: updateBody.username,
			},
		}))
	) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
	}

	// update the user

	// update user profile
	const updatedUserProfile = await prisma.userProfile.update({
		data: {
			bio: updateBody.bio,
			avatarUrl: updateBody.avatarUrl,
		},
		where: {
			userId: userId,
		},
		include: {
			user: true,
		},
	});

	// const {bio,avatarUrl,...restBody} = updateBody
	// const updatedUser = await prisma.user.update({
	//   data: updateBody,
	//   where: {
	//     id: userId,
	//   },
	//   include: {
	//     profile: true,
	//   },
	// });

	return updatedUserProfile;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

const deleteUserById = async (userId) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}
	await user.remove();
	return user;
};

//assignClient

/**
 *
 * Assign a client to a coach
 * @param {Object} assignClientPayload
 * @returns {Promise<User>}
 */

// const assignClient = async ({ coachId, clientId }) => {
// 	const coachUser = await prisma.user.findUnique({
// 		where: {
// 			id: +coachId,
// 			role: Role.COACH,
// 		},
// 		include: {
// 			clients: true,
// 		},
// 	});

// 	if (!coachUser) {
// 		throw new ApiError(httpStatus.NOT_FOUND, 'No Coach or User found');
// 	}
// 	const clientUser = await prisma.user.findUnique({
// 		where: {
// 			id: +clientId,
// 			role: Role.CLIENT,
// 		},
// 	});

// 	if (!clientUser) {
// 		throw new ApiError(httpStatus.NOT_FOUND, 'No Client or User found');
// 	}

// 	// await user.remove();

// 	/// assign now

// 	const updatedClientUser = await prisma.user.update({

// 		//we use where to put some condition 
// 		data: {
// 			coachId: coachUser.id,
// 		},
// 		where: {
// 			id: clientUser.id,
// 		},
// 		include: {
// 			department: {
// 				include: {
// 					company: true,
// 				},
// 			},
// 			coach: true,
// 		},
// 	});
// 	return {
// 		coach: coachUser,
// 		client: updatedClientUser,
// 	};
// };

/// clients and coaches managment
const assignClients = async ({ coachId, clientIds }) => {
	const coachUser = await prisma.user.findUnique({
		where: {
			id: +coachId,
			role: Role.COACH,
		},
		include: {
			clients: true,
		},
	});

	if (!coachUser) {
		throw new ApiError(httpStatus.NOT_FOUND, 'No Coach or User found');
	}

	const assignedClients = [];

	for (const clientId of clientIds) {
		const clientUser = await prisma.user.findUnique({
			where: {
				id: +clientId,
				role: Role.CLIENT,
			},
		});

		if (!clientUser) {
			throw new ApiError(httpStatus.NOT_FOUND, `No Client found with ID ${clientId}`);
		}

		const updatedClientUser = await prisma.user.update({
			where: {
				id: clientUser.id,
			},
			data: {
				coachId: coachUser.id,
			},
			include: {
				department: {
					include: {
						company: true,
					},
				},
				coach: true,
			},
		});

		assignedClients.push(updatedClientUser);
	}

	return {
		coach: coachUser,
		clients: assignedClients,
	};
};







module.exports = {
	createUser,
	queryUsers,
	getUserById,
	getUserByEmail,
	updateUserById,
	deleteUserById,
	assignClients,
};
