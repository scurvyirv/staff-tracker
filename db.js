//this file handles establishing connection with db files

//establish a connection to the database postgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'stafftracker_db', //derived from schema.sql
    password: '',
    port: 5432,
});

module.exports = pool;