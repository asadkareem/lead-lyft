// //module.exports = {
// 	recordLeadLyftScore,
// 	updateLeadLyftScroe,
// 	getClientLeadLyfts,
// };

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientActionService } = require('../services');

const createAction = catchAsync(async (req, res) => {
	// return;
	const payload = {
		...req.body,
		clientId: req.user.id,
	};
	const created = await clientActionService.createAction(payload);
	res.status(httpStatus.CREATED).send(created);
});

const updateCientActionStatus = catchAsync(async (req, res) => {
	const result = await clientActionService.updateCientActionStatus({
		actionStatus: req.body.actionStatus,
		actionId: req.params.actionId,
	});
	res.send(result);
});
const getClientActions = catchAsync(async (req, res) => {
	const result = await clientActionService.getClientActions(req.user.id);
	res.send(result);
});

module.exports = {
	createAction,
	updateCientActionStatus,
	getClientActions,
};
