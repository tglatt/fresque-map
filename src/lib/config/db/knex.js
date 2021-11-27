import Knex from 'knex';
import knexfile from '$lib/config/db/knexfile.js';

export default Knex(knexfile);
