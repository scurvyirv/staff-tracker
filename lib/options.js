//this file handles the different choices available from the inquirer prompt by providing front-end functions that display data and also some back-end functions that update the database

const inquirer = require('inquirer');
//import database connection logic
const pool = require('../db.js');


//function to interact with database (takes a sql statement and pass an argument through it)
const query = async (sql, args = []) => {
    //connects to the database and stores that connection in 'client'
    const client = await pool.connect()
    try {
        const result = await client.query(sql, args);
        return result.rows;
        //this removes connection from database
    } finally {
        client.release();
    }
};

//first option -view all employees-
async function viewAllEmployees() {
    try {
        //this renders data named employeeData into the terminal from SQL db! 
        const rows = await query(`SELECT
        departments.id AS ID,
        employees.first_name AS First_Name,
        employees.last_name AS Last_Name,
        roles.title AS Title,
        departments.department_name AS Department,
        roles.salary AS Salary,
        CONCAT(managers.first_name, ' ', managers.last_name) AS Manager
    FROM
        departments
    JOIN
        roles ON departments.id = roles.department
    JOIN 
        employees ON roles.id = employees.role_id
    LEFT JOIN 
        employees AS managers ON employees.manager_id = managers.id;`);
        console.table(rows)
        return rows;
    } catch (error) {
        console.error('error fetching employees', error);
    }
};

//second option -add employee-
async function addEmployee() {
    try {
        //fetch roles from the database since we NEED the dynamic source of roles to assign to new employee
        const currentRoles = await query('SELECT * FROM roles');
        //create a new array of role options for the prompt
        const roleOptions = currentRoles.map(row => ({ name: row.title, value: row.id }));
        const employeeInfo = await inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the employee's title?",
                name: "title",
                choices: roleOptions
            }
        ]).then(async (data) => {
            await query('INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3);', [data.first_name, data.last_name, data.title]);
            console.log("New employee added successfully");
        })
    } catch (error) {
        console.error("Error adding new employee", error);
    }
};

// third option -update employee role-
async function updateEmployeeRole() {
    try {
        //fetch roles from database
        const currentRoles = await query('SELECT * FROM roles;')
        //fetch employees from database
        const currentEmployees = await query('SELECT * FROM employees;')
        //create a new array of role options for the prompt
        const roleOptions = currentRoles.map(row => ({ name: row.title, value: row.id }));
        //create a new array of employee options 
        const employeeOptions = currentEmployees.map(row => ({ name: row.first_name + ' ' + row.last_name, value: row.id }))

        //generate prompts with dynamic list
        const employeeInfo = await inquirer.prompt([
            {
                type: "list",
                message: "what is the employee's name?",
                name: "employeeId",
                choices: employeeOptions
            },
            {
                type: "list",
                message: "what is the employee's new title?",
                name: "newRoleId",
                choices: roleOptions
            }
        ]).then(async (data) => {
            console.log('data', data.employeeId);
            await query('UPDATE employees SET role_id = $1 WHERE id = $2;', [data.newRoleId, data.employeeId]);
            console.log("Employee role updated successfully");
        })
    } catch (error) {
        console.error("Error updating employee role", error)
    }
};

//fourth option -view all roles-
async function viewAllRoles() {
    try {
        const rows = await query('SELECT * FROM roles;');
        console.table(rows)
        return rows;
    } catch (error) {
        console.error('error fetching roles', error);
    }
};

//fifth option -add role-
async function addRole() {
    try {
        //fetch all departments from the database
        const departmentList = await query('SELECT * FROM departments');
        //create a new array of department options for the prompt
        const departmentChoice = departmentList.map(row => ({ name: row.department_name, value: row.id }));
        const newRole = await inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the role?",
                name: "title"
            },
            {
                type: "list",
                message: "In what department does the role belong?",
                name: "department",
                choices: departmentChoice
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salary",
                validate: function (value) {
                    const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid salary (a number greater than zero)';
                }
            }
        ]).then(async (data) => {
            await query('INSERT INTO roles (title, department, salary) VALUES ($1, $2, $3);', [data.title, data.department, data.salary]);
            console.log("New role added successfully");
        })
    } catch (error) {
        console.error("Error adding new role", error);
    }
};

//sixth option -view all departments-
async function viewAllDepartments() {
    try {
        const rows = await query(`SELECT
        departments.id AS id,
        departments.department_name AS department
        
        FROM 
        departments;`);
        console.table(rows)
        return rows;
    } catch (error) {
        console.error('error fetching departments', error);
    }
};

//seventh option -add department-
async function addDepartment() {
    try {
        const newDepartment = await inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "department_name"
            }
        ]).then(async (data) => {
            await query('INSERT INTO departments (department_name) VALUES ($1);', [data.department_name]);
            console.log("New department added successfully");
        })
    } catch (error) {
        console.error("Error adding new department", error);
    }
};

//export child options/classes
module.exports =
{
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment,
};