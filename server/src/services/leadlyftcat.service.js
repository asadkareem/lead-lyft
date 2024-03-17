const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 *
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createLeadLyftCategory = async () => {
	const createdLeadLyftCate = await prisma.leadLyftCategory.create({
		data,
	});
	return createdLeadLyftCate;
};
/**
 * Create a a new deparment
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const getLeadLyftCategories = async () => {
	const categories = await prisma.leadLyftCategory.findMany();
	return categories;
};

module.exports = {
	createLeadLyftCategory,
	getLeadLyftCategories,
};
