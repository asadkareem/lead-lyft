//communicationValidation

const Joi = require('joi');

const reportListing = {
  body: Joi.object().keys({
    reason: Joi.string().required(),
    details: Joi.string(),
  }),
  params: Joi.object().keys({
    listingId: Joi.string().required(),
  }),
};
const reportMessage = {
  body: Joi.object().keys({
    reason: Joi.string().required(),
    details: Joi.string(),
  }),
  params: Joi.object().keys({
    messageId: Joi.string().required(),
  }),
};

module.exports = {
  reportListing,
  reportMessage,
};
