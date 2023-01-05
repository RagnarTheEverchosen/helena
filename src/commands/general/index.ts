import { category } from '../../utils';
import addCourse from './addCourse';
import removeCourse from './removeCourse';
import help from './help';

export default category('General', [
	addCourse,
	removeCourse,
	help
]);