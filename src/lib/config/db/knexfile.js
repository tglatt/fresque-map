import { getDbHost, getDbName, getDbPassword, getDbPort, getDbUser } from '../variables.js';

export default {
	client: 'pg',
	connection: {
		database: process.env.DB_NAME || getDbName(),
		user: process.env.DB_USER || getDbUser(),
		password: process.env.DB_PASSWORD || getDbPassword(),
		host: process.env.DB_HOST || getDbHost(),
		port: process.env.DB_PORT || getDbPort(),
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: '../../../../database/migrations',
	},
};
