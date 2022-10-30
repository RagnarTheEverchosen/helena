import { category } from '../../utils'
import verify from './verify'
import register from './register'

export default category('Auth', [
	verify,
	register,
])