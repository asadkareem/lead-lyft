const express = require('express');
const validate = require('../../middlewares/validate');
const { leadLyftCateogryValidation } = require('../../validations');
// const { departmentController } = require('../../controllers');
const { leadLyftCategoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
	.route('/')
	.post(
		auth('manageLeadLyftCategories'),
		validate(leadLyftCateogryValidation.createLeadLyftCategory),
		leadLyftCategoryController.createLeadLyftCategory
	);
router.route('/').get(
	auth('manageLeadLyftCategories'),
	// validate(leadLyftCateogryValidation.createLeadLyftCategory),
	auth('manageLeadLyftCategories'),
	leadLyftCategoryController.getLeadLyftCategories
);

module.exports = router;
