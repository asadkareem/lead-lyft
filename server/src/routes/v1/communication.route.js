//startConversation

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const communicationValidation = require('../../validations/communication.validation');
const communicationController = require('../../controllers/communication.controller');

const router = express.Router();

router
  .route('/:listingId/start')
  .post(auth('conversate'), validate(communicationValidation.startConversation), communicationController.startConversation);

router
  .route('/:conversationId/messages')
  .post(auth('conversate'), validate(communicationValidation.sendMessage), communicationController.sendMessage)
  .get(auth('conversate'), validate(communicationValidation.fetchMessages), communicationController.fetchMessages);

// router
//   .route('/:listingId/actions')
//   .post(auth('addAction'), validate(listingValidation.createListingAction), listingController.addListingAction);
// module.exports = router;

module.exports = router;
