const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { communicationService } = require('../services');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const startConversation = catchAsync(async (req, res) => {
  req.body['senderId'] = req.user.id;
  req.body['listingId'] = req.params.listingId;
  const listing = await communicationService.startConversation(req.body);
  res.status(httpStatus.CREATED).send(listing);
});
const fetchMessages = catchAsync(async (req, res) => {
  const messages = await communicationService.fetchMessages(req.params.conversationId);
  res.status(httpStatus.OK).send(messages);
});
const sendMessage = catchAsync(async (req, res) => {
  const sendMessageBody = {
    ...req.body,
    senderId: req.user.id,
    conversationId: req.params.conversationId,
  };
  const message = await communicationService.sendMessage(sendMessageBody);
  res.status(httpStatus.OK).send(message);
});

module.exports = {
  startConversation,
  fetchMessages,
  sendMessage,
};
