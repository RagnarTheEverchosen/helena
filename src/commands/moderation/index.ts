import { category } from '../../utils';
import createCourseRooms from './createCourseRooms';
import setupVerify from './setupVerify';
import setupFields from './setupFields';
import setupCourses from './setupCourses';

export default category('Moderations', [
	createCourseRooms,
	setupVerify,
	setupFields,
	setupCourses,
]);