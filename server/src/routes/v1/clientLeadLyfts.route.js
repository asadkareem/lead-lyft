const express = require('express');
const validate = require('../../middlewares/validate');
const { clientLeadLyftsValidation } = require('../../validations');
// const { departmentController } = require('../../controllers');
const { clientLeadLyftsController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
	.route('/')
	.post(
		auth('manageClientLeadLyfts'),
		validate(clientLeadLyftsValidation.recordLeadLyftScore),
		clientLeadLyftsController.recordLeadLyftScore
	);
router
	.route('/')
	.get(
		auth('manageClientLeadLyfts'),
		clientLeadLyftsController.getClientLeadLyfts
	);
router
	.route('/:leadLyftId')
	.get(
		auth('manageClientLeadLyfts'),
		clientLeadLyftsController.getClientLeadLyfts
	);

module.exports = router;
