const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
/**
 *
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
async function createHabit(data) {
	// Assuming prisma is already defined and available for database operations
	const newHabit = await prisma.habit.create({
		data: {
			habitName: data.habitName,
			habitGoalSet: data.habitGoalSet,
			note: data.note || null, // Optional note
			habitGoalAchieved: 1, // Setting initial achievement to 1
			clientId: data.clientId, // Assuming `clinetId` is the ID of the user creating the habit
			updatedAt: new Date(),
		},
	});
	return newHabit;
}

async function recordHabitEntry(habitId, clientId) {
	console.log({
		habitId,
	});
	// First, check if the habit was already incremented today

	const clientHabit = await prisma.habit.findFirst({
		where: {
			id: habitId,
			clientId: clientId,
		},
	});

	if (!clientHabit) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Not this client habit');
	}
	const todayStart = new Date();
	todayStart.setHours(0, 0, 0, 0);

	const todayEnd = new Date();
	todayEnd.setHours(23, 59, 59, 999);

	const habitEntriesToday = await prisma.habit.findMany({
		where: {
			id: habitId,
			clientId: clientId,
			// Filter entries updated today
			updatedAt: {
				gte: todayStart,
				lte: todayEnd,
			},
		},
	});

	if (habitEntriesToday.length > 0) {
		// Habit already updated today
		// throw new Error("You've already recorded your habit for today.");
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You've already recorded your habit for today."
		);
	} else {
		// Safe to increment habitGoalAchieved
		const updatedHabit = await prisma.habit.update({
			where: {
				id: habitId,
			},
			data: {
				habitGoalAchieved: {
					increment: 1,
				},
			},
		});
		return updatedHabit;
	}
}

// all the filteration here later on
/**
 * Create a a new deparment
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const getClientHabits = async (clientId) => {
	/// we have to apply all the filteration here
	// daily
	// weekly
	// monthly

	const results = await prisma.habit.findMany({
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
	createHabit,
	recordHabitEntry,
	getClientHabits,
};
