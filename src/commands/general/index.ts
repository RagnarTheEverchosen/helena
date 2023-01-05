import { category } from '../../utils';
import addCourse from './addCourse';
import removeCourse from './removeCourse';

export default category('General', [
	addCourse,
	removeCourse,
]);