const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const reportListing = catchAsync(async (req, res) => {
  const reportBody = {
    ...req.body,
    userId: req.user.id,
    listingId: req.params.listingId,
  };
  const reported = await reportService.reportListing(reportBody);
  res.status(httpStatus.CREATED).send(reported);
});
const reportMessage = catchAsync(async (req, res) => {
  const reportBody = {
    ...req.body,
    userId: req.user.id,
    messageId: req.params.messageId,
  };
  const reported = await reportService.reportMessage(reportBody);
  res.status(httpStatus.CREATED).send(reported);
});

module.exports = {
  reportListing,
  reportMessage,
};
