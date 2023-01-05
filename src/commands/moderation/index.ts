import { category } from '../../utils';
import createCourseRooms from './createCourseRooms';
import setupVerify from './setupVerify';
import setupFields from './setupFields'; 

export default category('Moderations', [
	createCourseRooms,
	setupVerify,
	setupFields,
]);