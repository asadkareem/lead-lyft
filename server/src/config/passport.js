const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const { PrismaClient, Token, TokenType } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtOptions = {
	secretOrKey: config.jwt.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
	try {
		if (payload.type !== TokenType.ACCESS) {
			throw new Error('Invalid token type');
		}

		// console.log({
		//   sub: payload.sub,
		// });
		const user = await prisma.user.findUnique({
			where: {
				id: payload.sub,
			},
		});

		if (!user) {
			return done(null, false);
		}
		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
	jwtStrategy,
};
