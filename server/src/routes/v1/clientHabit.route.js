const express = require('express');
const validate = require('../../middlewares/validate');
const { clientHabitValidation } = require('../../validations');
// const { departmentController } = require('../../controllers');
const { clientsHabitsController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
	.route('/')
	.post(
		auth('manageClientHabits'),
		validate(clientHabitValidation.createHabit),
		clientsHabitsController.createHabit
	);
router
	.route('/:habitId')
	.put(
		auth('manageClientHabits'),
		validate(clientHabitValidation.recordHabitEntry),
		clientsHabitsController.recordHabitEntry
	);
router
	.route('/')
	.get(auth('manageClientHabits'), clientsHabitsController.getClientHabits);

module.exports = router;
