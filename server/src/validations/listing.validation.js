const Joi = require('joi');

const createListing = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    images: Joi.array().required(),
    location: Joi.string().required(),
  }),
};
const createListingAction = {
  params: Joi.object().keys({
    listingId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    type: Joi.string().required(),
  }),
};

const getListings = {
  query: Joi.object().keys({
    location: Joi.string(),
    category: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createListing,
  getListings,
  createListingAction,
};
