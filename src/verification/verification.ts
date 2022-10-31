import axios from 'axios';
import cheerio from 'cheerio';
import { UserModel } from '../types';

export function sendVerificationEmail(email: string): void {

};

function getStudentStatus(id: number): Promise<string> {
	const date = new Date();
	const url = `https://is.mendelu.cz/karty/platnost.pl?cislo=${id};datum=${date.toLocaleDateString()};lang=cz`;
	const axiosInstance = axios.create();

	const request = axiosInstance.get(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);
			const status = $('tr:nth-child(2) > .odsazena > b');
			return status.text();
		})
		.catch(error => {
			console.error(error);
			return '';
		})

	return request;

};

export async function isValidStudent(id: number): Promise<boolean> {
	const status = await getStudentStatus(id);
	if (status === 'ano') {
		return true;
	} else {
		return false;
	}
};

export function isValidEmail(email: string): boolean {
	const expression: RegExp = /^(x|qq)[A-Z0-9._%+-]+@mendelu.cz$/i;
	return expression.test(email);
};

export async function isUserInDatabase(id: string): Promise<boolean> {
	if (await UserModel.findOne({ 'id': id })) {
		return true;
	} else {
		return false;
	}
};

export async function isUserTokenValid(id: string, token: number): Promise<boolean> {
	const user = await UserModel.findOne({ 'id': id });
	if (!user) return false;
	if (token !== user.token ) return false;
	return true;
}