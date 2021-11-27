import dotenv from 'dotenv';

dotenv.config();

export function getDbName() {
	return process.env['DB_NAME'];
}

export function getDbUser() {
	return process.env['DB_USER'];
}

export function getDbHost() {
	return process.env['DB_HOST'];
}

export function getDbPassword() {
	return process.env['DB_PASSWORD'];
}

export function getDbPort() {
	return parseInt(process.env['DB_PORT']);
}

export function getJwtKey() {
	return process.env['JWT_KEY'];
}

export function getAppUrl() {
	return process.env['APP_URL'];
}

export function getSmtpConfig() {
	const { SMTP_FROM, SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } = process.env;
	return {
		SMTP_FROM,
		SMTP_HOST,
		SMTP_PASS,
		SMTP_PORT: parseInt(SMTP_PORT),
		SMTP_USER,
	};
}
