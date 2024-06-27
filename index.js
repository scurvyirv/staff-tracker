//front end; this file handles the primary inquirer prompt the user sees to provide various options to organize company data
const inquirer = require('inquirer');

//import connection to database
const pool = require('./db.js');

//function to interact with database (takes a sql statement and pass an argument through it)
// const query = async (sql, args = []) => {
//     //connects to the database and stores that connection in 'client'
//     const client = await pool.connect()
//     try {
//         const result = await client.query(sql, args);
//         return result;
//         //this removes connection from database
//     } finally {
//         client.release();
//     }
// };

//this renders data named employeeData into the terminal from SQL db! 
//now we need to manipulate it to render based on the option the user selects from our inquirer prompt
// query('SELECT * FROM employees;')
//     .then(({rows}) => {
//         const employeeData = rows
//         console.log(employeeData)
//     })

//import options
const { viewAllEmployees, addEmployee, updateEmployeeRole, viewAllRoles, addRole, viewAllDepartments, addDepartment } = require('./lib/options');
console.log('hello')
//this will prompt questions on what company would like to do
inquirer
    .prompt([
        {
            type: "list",
            message: "what would you like to do?",
            name: "option",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        }
    ])
    .then((response) => {
        // this is an instantiation of each choice 
        let newOption;
        switch (response.option) {
            case "View All Employees":
                // newOption = new ViewAllEmployees();
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Quit":
                console.log("Exiting the application...");
                process.exit(0); // Exit the application
                break;
            default:
                console.log("Invalid option selected.");
        }
    })

    .catch((error) => {
        console.log(error)
    });

//don't export anything from this file pls to prevent circular logic/infinite loop