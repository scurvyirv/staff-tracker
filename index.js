const inquirer = require('inquirer');

//import options
const { ViewAllEmployees } = require('./lib/options');

//this will prompt questions on what company would like to do
inquirer
    .prompt([
        {
            type: "list",
            message: "what would you like to do?",
            name: "option",
            options: [
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
        // this is an instantiation of each option selected from the terminal 
        let newOption;
        switch (response.option) {
            case "View All Employees":
                newOption = new ViewAllEmployees();
                break;
            case "Add Employee":
                newOption = new AddEmployee();
                break;
            case "Update Employee Role":
                newOption = new UpdateEmployeeRole();
                break;
            case "View All Roles":
                newOption = new ViewAllRoles();
                break;
            case "Add Role":
                newOption = new AddRole();
                break;
            case "ViewAllDepartments":
                newOption = new ViewAllDepartments();
                break;
            case "Add Department":
                newOption = new AddDepartment();
                break;
            case "Quit":
                newOption = new queueMicrotask();
                break;
        }

        // invoke the methods from shape class
        newOption.setChoice(response.option);

        // invoke SVG logic into terminal (is this where we render SQL data?)
        // const renderedOption = newOption.render();
        // console.log(renderedOption);


    })

    .catch((error) => {
        console.log(error)
    });