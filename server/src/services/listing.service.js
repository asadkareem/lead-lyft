const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create Listing
 * @param {Object} listingBody
 * @returns {Promise<prisma.user>}
 */
const createListing = async (listingBody) => {
  const createdListing = await prisma.listing.create({
    data: listingBody,
  });

  return createdListing;
};

/**
 * Add listing action
 * @param {Object} actionBody
 * @returns {Promise<prisma.user>}
 */
async function addActionToListing({ userId, listingId, type, comment }) {
  // Create a new action and link it to the listing and user
  const newAction = await prisma.action.create({
    data: {
      type,
      comment,
      listingId,
      userId,
    },
  });

  return newAction;
}
/**
 * Query for listings
 * @param {Object} filter - Custom Filter for prisma
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryListings = async (filter, options) => {
  const { location, category } = filter;
  const { sortBy, limit, page } = options;

  // Parse sortBy to compatible format
  let orderBy = {};
  if (sortBy) {
    const [sortField, sortOrder] = sortBy.split(':');
    orderBy[sortField] = sortOrder || 'asc';
  }

  // Calculate pagination variables
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * pageSize;

  // Construct the Prisma query
  const queryOptions = {
    where: {
      ...(location && { location }),
      ...(category && { category }),
    },
    include: {
      conversations: true,
    },
    orderBy,
    take: pageSize,
    skip,
  };

  // Execute the query
  const listings = await prisma.listing.findMany(queryOptions);
  return listings;
};

module.exports = {
  createListing,
  queryListings,
  addActionToListing,
};
