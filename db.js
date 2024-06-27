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
//this was copied from index.js in an attempt to separate concerns but SUBJECT TO CHANGE
//function to interact with database (takes a sql statement and pass an argument through it)
const query = async (sql, args = []) => {
    //connects to the database and stores that connection in 'client'
    const client = await pool.connect()
    try {
        const result = await client.query(sql, args);
        return result;
    //this removes connection from database
    } finally {
        client.release();
    }
};

//this renders data named employeeData into the terminal from SQL db! 
//now we need to manipulate it to render based on the option the user selects from our inquirer prompt
query('SELECT * FROM employees;')
    .then(({rows}) => {
        const employeeData = rows
        console.log(employeeData)
    })

module.exports = pool;