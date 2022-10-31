import { connect } from 'mongoose';
import keys from '../keys';

connect(keys.databaseToken)
	.then(() => {
		console.log('[Database] Connected successfuly')
	})
	.catch((err) => {
		console.error('[Database Error]', err);
	});
