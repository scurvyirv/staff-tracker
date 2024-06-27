//this file handles updating db files by providing functions to add data, such as new employees, roles, and/or departments

//import database connection
const pool = require('./db.js');

//handles updating database when adding new employees
async function addEmployeeToDatabase(firstName, lastName, roleId) {
    try {
        const queryText = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)';
        const values = [firstName, lastName, roleId];
        await db.query(queryText, values);
    } catch (error) {
        console.error("Error adding employee to the database", error);
        throw error;
    }
}

module.exports = {
    addEmployeeToDatabase,
};