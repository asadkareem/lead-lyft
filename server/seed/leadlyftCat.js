const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	const leadLyftCategories = await prisma.leadLyftCategory.createMany({
		data: [
			{
				leadLyftCatName: 'Personal',
				leadLyftCatMinScore: 0,
				leadLyftCatMaxScore: 10,
			},
			{
				leadLyftCatName: 'Relationship',
				leadLyftCatMinScore: 0,
				leadLyftCatMaxScore: 10,
			},
			{
				leadLyftCatName: 'Work',
				leadLyftCatMinScore: 0,
				leadLyftCatMaxScore: 10,
			},
			{
				leadLyftCatName: 'Overall',
				leadLyftCatMinScore: 0,
				leadLyftCatMaxScore: 10,
			},
		],
	});

	console.log({ leadLyftCategories });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
