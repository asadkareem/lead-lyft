const { Token } = require('@prisma/client');
const allRoles = {
	CLIENT: [
		'manageDepartment',
		'manageClientLeadLyfts',
		'manageLeadLyftCategories',
		'manageClientHabits',
		'manageClientActions',
	],
	COACH: ['manageDepartment'],
	ADMIN: ['manageUsers', 'manageDepartment', 'manageLeadLyftCategories'],
	CORPORATE: ['manageReports'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
	roles,
	roleRights,
};
