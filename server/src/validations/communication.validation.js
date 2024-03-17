//communicationValidation

const Joi = require('joi');

const startConversation = {
  body: Joi.object().keys({
    receiverId: Joi.string().required(),
    content: Joi.string(),
  }),
  params: Joi.object().keys({
    listingId: Joi.string().required(),
  }),
};
const sendMessage = {
  body: Joi.object().keys({
    receiverId: Joi.string().required(),
    content: Joi.string(),
  }),
  params: Joi.object().keys({
    conversationId: Joi.string().required(),
  }),
};
const fetchMessages = {
  params: Joi.object().keys({
    conversationId: Joi.string().required(),
  }),
};

module.exports = {
  startConversation,
  fetchMessages,
  sendMessage,
};
