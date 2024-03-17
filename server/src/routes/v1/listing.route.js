const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const listingValidation = require('../../validations/listing.validation');
const listingController = require('../../controllers/listing.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createListing'), validate(listingValidation.createListing), listingController.createListing)
  .get(auth('queryListings'), validate(listingValidation.getListings), listingController.queryListings);

router
  .route('/:listingId/actions')
  .post(auth('addAction'), validate(listingValidation.createListingAction), listingController.addListingAction);
module.exports = router;
