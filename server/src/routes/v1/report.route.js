//startConversation

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reportValidation = require('../../validations/report.validation');
const reportController = require('../../controllers/report.controller');

const router = express.Router();

router
  .route('/listings/:listingId')
  .post(auth('reporting'), validate(reportValidation.reportListing), reportController.reportListing);
router
  .route('/messages/:messageId')
  .post(auth('reporting'), validate(reportValidation.reportMessage), reportController.reportMessage);

// router
//   .route('/:listingId/actions')
//   .post(auth('addAction'), validate(listingValidation.createListingAction), listingController.addListingAction);
// module.exports = router;

module.exports = router;
