const express = require('express');
const validate = require('../../middlewares/validate');
const { clientActionValidation } = require('../../validations');
// const { departmentController } = require('../../controllers');
const { clientActionController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
	.route('/')
	.post(
		auth('manageClientActions'),
		validate(clientActionValidation.createAction),
		clientActionController.createAction
	);
router
	.route('/:actionId')
	.put(
		auth('manageClientActions'),
		validate(clientActionValidation.updateCientActionStatus),
		clientActionController.updateCientActionStatus
	);
router
	.route('/')
	.get(auth('manageClientActions'), clientActionController.getClientActions);

module.exports = router;
