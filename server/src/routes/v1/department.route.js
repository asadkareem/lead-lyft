const express = require('express');
const validate = require('../../middlewares/validate');
const { departmentValidation } = require('../../validations');
// const { departmentController } = require('../../controllers');
const departmentController = require('../../controllers/department.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
	.route('/')
	.post(
		auth('manageDepartments'),
		validate(departmentValidation.createDepartment),
		departmentController.createDepartment
	);

module.exports = router;
