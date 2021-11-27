import { getJwtKey } from '$lib/config/variables';
import cookie from 'cookie';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	if (cookies.jwt) {
		try {
			const key = getJwtKey();
			const user = jwt.verify(cookies.jwt, key, { algorithms: ['HS256'] });
			request.locals.user = user;
			request.locals.token = cookies.jwt;
		} catch (error) {
			request.locals.user = null;
			request.locals.token = null;
		}
	} else {
		request.locals.user = null;
		request.locals.token = null;
	}
	return await resolve(request);
};

export const getSession = async ({ locals }) => {
	const session = {
		user: locals.user,
		token: locals.token,
	};

	return session;
};
