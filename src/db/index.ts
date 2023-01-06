import { connect } from 'mongoose';
import keys from '../keys';
import { Logger } from '../logger';

connect(keys.databaseUrl)
	.then(() => {
		Logger.info('Database connected successfuly')
	})
	.catch((err) => {
		Logger.error('Database connection error', err);
	});
