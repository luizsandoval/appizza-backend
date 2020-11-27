import knex from 'knex';

const knexfile = require('../../knexfile');

const ENV = process.env.NODE_ENV || 'development';

const connection = knex(knexfile[ENV]);

export default connection;
