const Joi = require('joi');
const recordLeadLyftScore = {
	body: Joi.object().keys({
		privateNote: Joi.string(),
		leadLyftScore: Joi.number().required(),
		leadLyftCatId: Joi.number().required(),
		reason: Joi.string(),
	}),
};
const updateClientLeadLyft = {
	body: Joi.object().keys({
		privateNote: Joi.string(),
		leadLyftScore: Joi.number().required(),
		leadLyftCatId: Joi.number().required(),
		reason: Joi.string(),
	}),
	params: Joi.object().keys({
		leadLyftId: Joi.number().required(),
	}),
};

module.exports = {
	recordLeadLyftScore,
	updateClientLeadLyft,
};

// model LeadLyft{
//   id Int @id @default(autoincrement())
//   privateNote String?
//   leadLyftScore Float
//   leadLyftCatId Int
//   leadLyftCategory LeadLyftCategory @relation(fields: [leadLyftCatId], references: [id])
//   reason       String?
//   coahInputRequested Boolean? @default(false)
//   coachInputGranted Boolean? @default(false)
//   coachComments     String?
//   clientId          Int
//   user              User @relation(fields: [clientId], references: [id])
//   createdAt         DateTime           @default(now())
//   updatedAt         DateTime?

// }
