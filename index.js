//front end
const inquirer = require('inquirer');

//import connection to database
const pool = require('./db.js');

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

query('SELECT * FROM employees;')
    .then(({rows}) => {
        const employeeData = rows
        console.log(employeeData)
    })

// //import options
// const { ViewAllEmployees, AddEmployee, UpdateEmployeeRole, ViewAllRoles, AddRole, ViewAllDepartments, AddDepartment, Quit  } = require('./lib/options');

// //this will prompt questions on what company would like to do
// inquirer
//     .prompt([
//         {
//             type: "list",
//             message: "what would you like to do?",
//             name: "option",
//             options: [
//                 "View All Employees",
//                 "Add Employee",
//                 "Update Employee Role",
//                 "View All Roles",
//                 "Add Role",
//                 "View All Departments",
//                 "Add Department",
//                 "Quit"
//             ]
//         }
//     ])
//     .then((response) => {
//         // this is an instantiation of each option selected from the terminal 
//         let newOption;
//         switch (response.option) {
//             case "View All Employees":
//                 newOption = new ViewAllEmployees();
//                 break;
//             case "Add Employee":
//                 newOption = new AddEmployee();
//                 break;
//             case "Update Employee Role":
//                 newOption = new UpdateEmployeeRole();
//                 break;
//             case "View All Roles":
//                 newOption = new ViewAllRoles();
//                 break;
//             case "Add Role":
//                 newOption = new AddRole();
//                 break;
//             case "ViewAllDepartments":
//                 newOption = new ViewAllDepartments();
//                 break;
//             case "Add Department":
//                 newOption = new AddDepartment();
//                 break;
//             case "Quit":
//                 newOption = new Quit();
//                 break;
//         }

//         // invoke the methods from shape class
//         newOption.setChoice(response.option);

//         // invoke SVG logic into terminal (is this where we render SQL data?)
//         // const renderedOption = newOption.render();
//         // console.log(renderedOption);


//     })

//     .catch((error) => {
//         console.log(error)
//     });