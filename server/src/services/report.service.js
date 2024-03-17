const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Report a listing
 * @param {Object} reportBody
 * @returns {Promise<message>}
 */
const reportListing = async (reportBody) => {
  // reportBody['messageId'] = null;
  const reported = await prisma.report.create({
    data: reportBody,
  });

  return reported;
};

/**
 * Report a message
 * @param {Object} reportBody
 * @returns {Promise<message>}
 */
const reportMessage = async (reportBody) => {
  const reported = await prisma.report.create({
    data: reportBody,
  });

  return reported;
};

module.exports = {
  reportMessage,
  reportListing,
};
