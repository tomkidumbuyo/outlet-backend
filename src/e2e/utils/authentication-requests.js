import { postRequest } from './common';

export async function userRegistration({ email, password, verifyPassword }) {
	const user = await postRequest('/auth/register', {
		email,
		password,
		verifyPassword,
	});
	return user;
}

export async function userLogin({ email, password }) {
	const user = await postRequest('/auth/login', {
		email,
		password,
	});
	return user;
}
