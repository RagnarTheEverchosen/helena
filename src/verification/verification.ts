import axios from 'axios'
import cheerio from 'cheerio'

export function isValidEmail(email: string): boolean {
	const expression: RegExp = /^x[A-Z0-9._%+-]+@mendelu.cz$/i
	return expression.test(email)
}
