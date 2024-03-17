const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
/**
 *
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const recordLeadLyftScore = async (data) => {
	// Assume prisma is already defined and available for database operations
	const leadLyftCategory = await prisma.leadLyftCategory.findUnique({
		where: {
			id: data.leadLyftCatId,
		},
	});

	// Validate the leadLyftScore against category boundaries
	if (
		data.leadLyftScore > leadLyftCategory.leadLyftCatMaxScore ||
		data.leadLyftScore < leadLyftCategory.leadLyftCatMinScore
	) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'LeadLyft max/min score corrupted'
		);
	}

	// Get today's date range
	const todayStart = new Date();
	todayStart.setHours(0, 0, 0, 0);

	const todayEnd = new Date();
	todayEnd.setHours(23, 59, 59, 999);

	// Check if there is already a leadLyft entry for today for this user and category
	const existingEntry = await prisma.leadLyft.findFirst({
		where: {
			clientId: data.clientId, // Assuming data contains userId
			leadLyftCatId: data.leadLyftCatId,
			createdAt: {
				gte: todayStart,
				lte: todayEnd,
			},
		},
	});

	if (existingEntry) {
		// Update existing entry's score
		const updated = await prisma.leadLyft.update({
			where: {
				id: existingEntry.id,
			},
			data: {
				leadLyftScore: data.leadLyftScore,
				privateNote: data.privateNote,
			},
			include: {
				user: {
					include: {
						leadLyfts: true,
					},
				},
			},
		});
		return updated;
	} else {
		// Create a new entry if no existing entry is found
		const created = await prisma.leadLyft.create({
			data,
			include: {
				user: {
					include: {
						leadLyfts: true,
					},
				},
			},
		});
		return created;
	}
};

const updateLeadLyftScroe = async ({ id, leadLyftScore }) => {
	const updated = await prisma.leadLyft.update({
		where: {
			id: id,
		},
		data: {
			leadLyftScore,
		},
	});
	return updated;
};

// all the filteration here later on
/**
 * Create a a new deparment
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const getClientLeadLyfts = async (clientId) => {
	/// we have to apply all the filteration here
	// daily
	// weekly
	// monthly

	const results = await prisma.leadLyft.findMany({
		where: {
			clientId: clientId,
		},
		include: {
			user: true,
		},
	});
	return results;
};

module.exports = {
	recordLeadLyftScore,
	updateLeadLyftScroe,
	getClientLeadLyfts,
};
