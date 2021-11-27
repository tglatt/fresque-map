import knex from '$lib/config/db/knex';
import { getJwtUser } from '$lib/utils/getJwt';

export const post = async (request) => {
	const { accessKey } = request.body;

	const accessKeyResult = await knex('users').where({ access_key: accessKey }).limit(1);

	if (!accessKeyResult.length) {
		return {
			status: 401,
			body: {
				errors: `no user for key ${accessKey}`,
			},
		};
	}

	const user = accessKeyResult[0];

	await knex('users').update({ access_key: null, access_key_date: null }).where({ id: user.id });

	const jwtUser = getJwtUser({
		uid: user.uid,
	});

	return {
		headers: {
			'set-cookie': `jwt=${jwtUser.token}; Path=/; HttpOnly; SameSite=Strict`,
		},
		body: {
			jwt: jwtUser.token,
		},
		status: 200,
	};
};
