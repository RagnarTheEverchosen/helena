import { category } from '../../utils';
import createCourseRooms from './createCourseRooms';
import setupverify from './setupVerify';

export default category('Moderations', [
	createCourseRooms,
	setupverify,
]);