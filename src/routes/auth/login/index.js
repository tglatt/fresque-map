import knex from '$lib/config/db/knex';
import { getAppUrl } from '$lib/config/variables';
import { emailLoginRequest } from '$lib/utils/emailLoginRequest';
import { sendEmail } from '$lib/utils/sendEmail';
import { v4 } from '@lukeed/uuid';

export const post = async (request) => {
	const { email } = request.body;

	const userResult = await knex('users').where({ email }).limit(1);

	if (!userResult.length) {
		return {
			status: 401,
			body: {
				errors: 'USER_NOT_FOUND',
			},
		};
	}

	const user = userResult[0];

	const accessKey = v4();

	// TODO: handle access_key_date
	await knex('users').update({ access_key: accessKey }).where({ id: user.id });

	const appUrl = getAppUrl();

	// send email
	console.log(`${appUrl}/auth/jwt/${accessKey}`);
	try {
		await sendEmail({
			to: user.email,
			subject: 'Accédez à Fresque Maps',
			html: emailLoginRequest({
				firstname: user.firstname,
				lastname: user.lastname,
				accessKey,
				appUrl,
			}),
		});
	} catch (e) {
		console.log(e);
	}

	return {
		status: 200,
		body: {
			email,
			...{ accessUrl: process.env['SANDBOX_LOGIN'] ? `/auth/jwt/${accessKey}` : null },
		},
	};
};
