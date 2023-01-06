import { category } from '../../utils';
import addCourse from './addCourse';
import removeCourse from './removeCourse';
import addField from './addField';
import removeField from './removeField';

export default category('General', [
	addCourse,
	removeCourse,
	addField,
	removeField,
]);