// //module.exports = {
// 	recordLeadLyftScore,
// 	updateLeadLyftScroe,
// 	getClientLeadLyfts,
// };

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientHabitService } = require('../services');

const createHabit = catchAsync(async (req, res) => {
	console.log({
		userId: req.user.id,
	});
	// return;
	const payload = {
		...req.body,
		clientId: req.user.id,
	};
	const created = await clientHabitService.createHabit(payload);
	res.status(httpStatus.CREATED).send(created);
});

const recordHabitEntry = catchAsync(async (req, res) => {
	const habitId = req.params.habitId;
	const result = await clientHabitService.recordHabitEntry(
		habitId,
		req.user.id
	);
	res.send(result);
});
const getClientHabits = catchAsync(async (req, res) => {
	const result = await clientHabitService.getClientHabits(+req.user.id);
	res.send(result);
});

module.exports = {
	createHabit,
	recordHabitEntry,
	getClientHabits,
};
