import { category } from '../../utils';
import addCourse from './addCourse';
import removeCourse from './removeCourse';

export default category('Utility', [
	addCourse,
	removeCourse
]);