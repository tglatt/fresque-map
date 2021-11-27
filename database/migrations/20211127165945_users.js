export async function up(knex) {
	await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
	return knex.schema.createTable('users', function (table) {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('email').notNullable();
		table.string('lastname').notNullable();
		table.string('firstname').notNullable();
		table.string('access_key');
		table.datetime('access_key_date');
		table.string('belt');
		table.string('mobile_number');
		table.string('description');
		table.specificType('coordinates', 'POINT');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}

export function down() {}
