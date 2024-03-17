// //module.exports = {
// 	recordLeadLyftScore,
// 	updateLeadLyftScroe,
// 	getClientLeadLyfts,
// };

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientLeadLyftsService } = require('../services');

const recordLeadLyftScore = catchAsync(async (req, res) => {
	const payload = {
		...req.body,
		clientId: +req.user.id,
	};
	const createdCateogry = await clientLeadLyftsService.recordLeadLyftScore(
		payload
	);
	res.status(httpStatus.CREATED).send(createdCateogry);
});

const updateLeadLyftScroe = catchAsync(async (req, res) => {
	const result = await clientLeadLyftsService.updateLeadLyftScroe();
	res.send(result);
});
const getClientLeadLyfts = catchAsync(async (req, res) => {
	const result = await clientLeadLyftsService.getClientLeadLyfts(+req.user.id);
	res.send(result);
});

module.exports = {
	recordLeadLyftScore,
	updateLeadLyftScroe,
	getClientLeadLyfts,
};
