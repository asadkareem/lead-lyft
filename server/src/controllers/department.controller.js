const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

const createDepartment = catchAsync(async (req, res) => {
	const { companyName, departmentName, companyId } = req.body;
	const createdDepartment = await departmentService.createDepartment(
		departmentName,
		companyName,
		companyId
	);
	res.status(httpStatus.CREATED).send(createdDepartment);
});

module.exports = {
	createDepartment,
};
