const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { listingService } = require('../services');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createListing = catchAsync(async (req, res) => {
  req.body['userId'] = req.user.id;
  const listing = await listingService.createListing(req.body);
  res.status(httpStatus.CREATED).send(listing);
});
const queryListings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['location', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const listings = await listingService.queryListings(filter, options);
  res.status(httpStatus.CREATED).send(listings);
});

const addListingAction = catchAsync(async (req, res) => {
  req.body['userId'] = req.user.id;
  req.body['listingId'] = req.params.listingId;
  const listing = await listingService.addActionToListing(req.body);
  res.status(httpStatus.CREATED).send(listing);
});

module.exports = {
  createListing,
  queryListings,
  addListingAction,
};
