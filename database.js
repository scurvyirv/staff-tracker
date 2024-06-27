//this file handles updating db files by providing functions to add data, such as new employees, roles, and/or departments

//import database connection
const pool = require('./db.js');

//2nd handles updating database when adding new employees
async function addEmployeeToDatabase(firstName, lastName, roleId) {
    try {
        const queryText = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3);';
        const values = [firstName, lastName, roleId];
        await db.query(queryText, values);
    } catch (error) {
        console.error("Error adding employee to the database", error);
        throw error;
    }
};

//5th handles updating database when adding new role
async function addRoleToDatabase(title, departmentId, salary) {
    try {
        const queryText = 'INSERT INTO roles (title, department, salary) VALUES ($1, $2, $3);';
        const values = [title, departmentId, salary];
        await db.query(queryText, values);
    } catch (error) {
        console.error("error adding role to database", error);
        throw error;
    }
};

//7th handles updating database when adding new department
async function addDepartmentToDatabase(department_name) {
    try {
        const queryText = 'INSERT INTO departments (department_name) VALUES ($1);';
        const values = [department_name];
        await db.query(queryText, values);
    } catch (error) {
        console.error("error adding department to database", error);
        throw error;
    }
};


module.exports = {
    addEmployeeToDatabase,
};