import { Keys } from '../types';

const keys: Keys = {
	clientToken: process.env.CLIENT_TOKEN ?? 'nil',
	testGuild: process.env.TEST_GUILD ?? 'nil',
	databaseUrl: process.env.DATABASE_URL ?? 'nil',
	unverifiedRole: process.env.UNVERIFIED_ROLE ?? 'nil',
	verifiedRole: process.env.VERIFIED_ROLE ?? 'nil',
	logChannel: process.env.LOG_CHANNEL ?? 'nil'
};

if (Object.values(keys).includes('nil'))
	throw new Error('Not all ENV variables are defined!');

export default keys;