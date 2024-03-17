const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
/**
 * a create a new client action
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
async function createAction(data) {
	// Assuming prisma is already defined and available for database operations
	const newAction = await prisma.action.create({
		data: {
			actionName: data.actionName,
			note: data.note,
			dueDate: data.dueDate,
			actionCategoryId: data.actionCategoryId,
			clientId: data.clientId,
		},
		include: {
			actionCategory: true,
			user: true,
		},
	});
	return newAction;
}

async function updateCientActionStatus({ actionStatus, actionId }) {
	try {
		const updatedAction = await prisma.action.update({
			data: {
				actionStatus,
			},
			where: {
				id: actionId,
			},
		});

		return updatedAction;
	} catch (err) {
		throw new ApiError(httpStatus[500], err.message);
	}
}

// all the filteration here later on
/**
 * Create a a new deparment
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const getClientActions = async (clientId) => {
	/// we have to apply all the filteration here
	// daily
	// weekly
	// monthly

	const results = await prisma.action.findMany({
		where: {
			clientId: clientId,
		},
		include: {
			user: true,
			actionCategory: true,
		},
	});
	return results;
};

module.exports = {
	createAction,
	updateCientActionStatus,
	getClientActions,
};
