import { getJwtKey } from '$lib/config/variables';
import jwt from 'jsonwebtoken';

export function getJwtUser({ uid }) {
	const token = getJwt({ uid });
	return {
		id: uid,
		token: token,
	};
}

export function getJwt({ uid }) {
	const signOptions = {
		algorithm: 'HS256',
		expiresIn: '30d',
		subject: `${uid}`,
	};

	const claim = {
		id: uid,
	};

	const key = getJwtKey();

	const token = jwt.sign(claim, key, signOptions);
	return token;
}
