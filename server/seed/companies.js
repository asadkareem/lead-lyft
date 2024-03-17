const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const companiesData = [
		{ companyName: 'Company A', departments: ['HR', 'Engineering'] },
		{ companyName: 'Company B', departments: ['HR', 'Engineering'] },
		{ companyName: 'Company C', departments: ['HR', 'Engineering'] },
		{ companyName: 'Company D', departments: ['HR', 'Engineering'] },
		{ companyName: 'Company E', departments: ['HR', 'Engineering'] },
	];

	for (const { companyName, departments } of companiesData) {
		const company = await prisma.company.create({
			data: {
				companyName,
				departments: {
					create: departments.map((departmentName) => ({
						departmentName,
					})),
				},
			},
			include: {
				departments: true, // Include the departments in the response for debugging
			},
		});

		console.log(
			`Created company with name: ${
				company.companyName
			} and departments: ${company.departments
				.map((d) => d.departmentName)
				.join(', ')}`
		);
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
