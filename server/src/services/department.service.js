const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a a new deparment
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createDepartment = async ({ departmentName, companyId, companyName }) => {
	let createdCompany = 0;
	if (!companyId) {
		// create a company first
		createdCompany = prisma.company.create({
			data: {
				companyName: companyName,
			},
		});
	}
	return prisma.department.create({
		data: {
			companyId: companyId ? companyId : createdCompany.id,
			departmentName,
		},
	});
};

module.exports = {
	createDepartment,
};
