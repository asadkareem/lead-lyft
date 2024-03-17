const express = require('express');
const authRoute = require('./auth.route.js');
const userRoute = require('./user.route.js');
const listingRoutes = require('./listing.route.js');
const communicationRotues = require('./communication.route.js');
const reportRoutes = require('./report.route.js');

// LEADLYFT app
const departmentRoutes = require('./department.route.js');
const leadLyftCategoryRoutes = require('./leadLyftCategory.route.js');
const clientLeadLyftRoutes = require('./clientLeadLyfts.route.js');
const clientHabitRoutes = require('./clientHabit.route.js');
const clientActionRoutes = require('./clientAction.route.js');

const docsRoute = require('./docs.route.js');
const config = require('../../config/config.js');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: authRoute,
	},
	{
		path: '/feed/listings',
		route: listingRoutes,
	},
	{
		path: '/communications',
		route: communicationRotues,
	},
	{
		path: '/reporting',
		route: reportRoutes,
	},
	{
		path: '/users',
		route: userRoute,
	},

	// LEADLYFT REOUTES
	{
		path: '/departments',
		route: departmentRoutes,
	},

	{
		path: '/leadlyft-categories',
		route: leadLyftCategoryRoutes,
	},
	{
		path: '/client-lead-lyfts',
		route: clientLeadLyftRoutes,
	},
	{
		path: '/client-habits',
		route: clientHabitRoutes,
	},
	{
		path: '/client-actions',
		route: clientActionRoutes,
	},
];

const devRoutes = [
	{
		path: '/accounts',
		route: authRoute,
	},
	{
		path: '/feed/listings',
		route: listingRoutes,
	},

	{
		path: '/communications',
		route: communicationRotues,
	},
	{
		path: '/reporting',
		route: reportRoutes,
	},
	{
		path: '/users',
		route: userRoute,
	},
	{
		path: '/docs',
		route: docsRoute,
	},

	// LEADLYFT REOUTES
	{
		path: '/departments',
		route: departmentRoutes,
	},
	{
		path: '/leadlyft-categories',
		route: leadLyftCategoryRoutes,
	},
	{
		path: '/client-lead-lyfts',
		route: clientLeadLyftRoutes,
	},
	{
		path: '/client-habits',
		route: clientHabitRoutes,
	},
	{
		path: '/client-actions',
		route: clientActionRoutes,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
