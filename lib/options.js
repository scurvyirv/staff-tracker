//this file handles the different choices available from the inquirer prompt by providing functions that display data or add new data with the help of another file (database.js)

const inquirer = require('inquirer');
//import database connection logic
const pool = require('../db.js');

// option parent class (WE WILL REMOVE once all classes reverted back to functions)
class Option {
    constructor() {
        this.choice = '';
    }
    setChoice(choice) {
        this.choice = choice;
    }
};

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
        const rows = await query('SELECT * FROM employees;');
        console.table(rows)
        return rows;
    } catch (error) {
        console.error('error fetching employees', error);
    }
};

// class ViewAllEmployees extends Option {
//     async render() {
//         try {
//             //this renders data named employeeData into the terminal from SQL db! 
//             const {rows} = await query('SELECT * FROM employees;');
//             console.table(rows);
//         } catch (error) {
//             console.error('error fetching employees', error);
//         }
//     }
// };

//second option -add employee-
async function addEmployee() {
    try {
        //fetch roles from the database since we NEED the dynamic source of roles to assign to new employee
        const currentRoles = await query('SELECT * FROM roles');
        //create a new array of role options for the prompt
        const roleOptions = currentRoles.rows.map(row => ({ name: row.title, value: row.id }));
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
        ]);
        //call addEmployeeToDatabase function from database.js
        await addEmployeeToDatabase(employeeInfo.first_name, employeeInfo.last_name, employeeInfo.title);
        console.log("New employee added successfully");

    } catch (error) {
        console.error("Error adding new employee", error);
    }
};

// class AddEmployee extends Option {
//     async render() {
//         try {
//             //fetch roles from the database since we NEED the dynamic source of roles to assign to new employee
//             const currentRoles = await query('SELECT * FROM roles'); 
//             //create a new array of role options for the prompt
//             const roleOptions = currentRoles.rows.map(row => ({ name: row.title, value: row.id }));
//             const employeeInfo = await inquirer.prompt([
//                 {
//                     type: "input",
//                     message: "What is the employee's first name?",
//                     name: "first_name"
//                 },
//                 {
//                     type: "input",
//                     message: "What is the employee's last name?",
//                     name: "last_name"
//                 },
//                 {
//                     type: "list",
//                     message: "What is the employee's title?",
//                     name: "title",
//                     choices: roleOptions
//                 }
//             ]);
//             //call addEmployee function to update the employee list
//             await addEmployee(employeeInfo.first_name, employeeInfo.last_name, employeeInfo.title);
//             console.log("New employee added successfully");

//         } catch (error) {
//             console.error("Error adding new employee", error);
//         }
//     }
// };

// third option -update employee role-
class UpdateEmployeeRole extends Option {
    async render() {
        try {
            //fetch roles from database
            const currentRoles = await query('SELECT * FROM roles;')
            //create a new array of role options for the prompt
            const roleOptions = currentRoles.rows.map(row => ({ name: row.title, value: row.id }));
            const employeeInfo = await inquirer.prompt([
                {
                    type: "input",
                    message: "what is the employee's first name?",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "what is the employee's last name?",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "what is the employee's current title?",
                    name: "current_title",
                    choices: roleOptions
                },
                {
                    type: "list",
                    message: "what is the employee's new title?",
                    name: "new_title",
                    choices: roleOptions
                }
            ])
            //call updateEmployeeRole function with prompt answers after await
            await updateEmployeeRole(employeeInfo.first_name, employeeInfo.last_name, employeeInfo.current_title, employeeInfo.new_title);
            console.log("employee role updated successfully");

        } catch (error) {
            console.error("error updating employee role", error)
        }
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
        const newRole = await inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the role?",
                name: "title"
            },
            {
                type: "input",
                message: "In what department does the role belong?",
                name: "departmentId"
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
        ]);
        //call addRoleToDatabase to update db
        await addRoleToDatabase(newRole.title, newRole.departmentId, newRole.salary);
        console.log("New role added successfully");

    } catch (error) {
        console.error("Error adding new role", error);
    }
};

// class AddRole extends Option {
//     async render() {
//         try {
//             const newRole = await inquirer.prompt([
//                 {
//                     type: "input",
//                     message: "What is the name of the role?",
//                     name: "title"
//                 },
//                 {
//                     type: "input",
//                     message: "In what department does the role belong?",
//                     name: "department"
//                 },
//                 {
//                     type: "input",
//                     message: "What is the salary for this role?",
//                     name: "salary",
//                     validate: function (value) {
//                         const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
//                         return valid || 'Please enter a valid salary (a number greater than zero)';
//                     }
//                 }
//             ]);
//             //call addEmployee function to update the employee list
//             await addRole(newRole.title, newRole.department, newRole.salary);
//             console.log("New role added successfully");

//         } catch (error) {
//             console.error("Error adding new role", error);
//         }
//     }
// };


//sixth option -view all departments-
async function viewAllDepartments() {
    try {
        const rows = await query('SELECT * FROM departments;');
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
        ]);
        //call addDepartmentToDatabase to update db
        await addDepartmentToDatabase(department_name);
        console.log("New role added successfully");

    } catch (error) {
        console.error("Error adding new role", error);
    }
};

//eighth option -QUIT-
class Quit extends Option {
    async render() {
        const client = new Client({
            user: 'your_username',
            host: 'your_host',
            database: 'your_database',
            password: 'your_password',
            port: 5432,
        });

        await client.connect();

        const result = await client.query('SELECT * FROM employees');
        const employees = result.rows;

        employees.forEach(employee => {
            console.log(`${employee.first_name} ${employee.last_name}`);
        });

        await client.end();
    }
};

//export child options/classes
module.exports =
{
    viewAllEmployees,
    AddEmployee,
    UpdateEmployeeRole,
    viewAllRoles,
    AddRole,
    viewAllDepartments,
    AddDepartment,
    Quit
};