import { connect } from 'mongoose';
import keys from '../keys';

connect(keys.databaseUrl)
	.then(() => {
		console.log('[Database] Connected successfuly')
	})
	.catch((err) => {
		console.error('[Database Error]', err);
	});
