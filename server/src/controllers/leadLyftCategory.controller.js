const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { leadLyftCategoryService } = require('../services');

const createLeadLyftCategory = catchAsync(async (req, res) => {
	const createdCateogry = await leadLyftCategoryService.createLeadLyftCategory(
		req.body
	);
	res.status(httpStatus.CREATED).send(createdCateogry);
});

module.exports = {
	createLeadLyftCategory,
};
const getLeadLyftCategories = catchAsync(async (req, res) => {
	const result = await leadLyftCategoryService.getLeadLyftCategories();
	res.send(result);
});

module.exports = {
	createLeadLyftCategory,
	getLeadLyftCategories,
};
