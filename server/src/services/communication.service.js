const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Start converstation
 * @param {Object} conversationBody
 * @returns {Promise<ConversationObject>}
 */
const startConversation = async ({ listingId, senderId, receiverId, content }) => {
  const conversation = await prisma.conversation.create({
    data: {
      initiatorId: senderId,
      listingId,
    },
  });
  // create the first message in this conversation
  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
      conversationId: conversation.id,
    },
  });

  return {
    conversation,
    message,
  };
};

/**
 * Fetch Messages by Converstaion
 * @param {string} conversationId
 * @returns {Promise<message[]>}
 */
const fetchMessages = async (conversationId) => {
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
  });

  return messages;
};
/**
 * Fetch Messages by Converstaion
 * @param {Object} sendMessageBody
 * @returns {Promise<message>}
 */
const sendMessage = async (sendMessageBody) => {
  const messages = await prisma.message.create({
    data: sendMessageBody,
  });

  return messages;
};

module.exports = {
  startConversation,
  fetchMessages,
  sendMessage,
};
