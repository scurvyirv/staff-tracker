const inquirer = require('inquirer');
//import database connection logic
const db = require('./db.js');

//option parent class 
class Option {
    constructor() {
        this.choice = '';
    }

    setChoice(choice) {
        this.choice = choice;
    }
};

//first option -view all employees-
class ViewAllEmployees extends Option {
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

//second option -add employee-
class AddEmployee extends Option {
    async render() {
        try {
            //fetch roles from database
            const client = await db.connect();
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
                    message: "what is the employee's title?",
                    name: "title",
                    options: [
                        ${ ViewAllRoles }
                    ]
                }
            ])
            //handle database connection after operations?

            //close database connection after operation
            await client.end();
        } catch(error) {
            console.error("error", error)
        }
    }
};

// third option -update employee role-
class UpdateEmployeeRole extends Option {
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

//fourth option -view all roles-
class ViewAllRoles extends Option {
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

//fifth option -add role-
class AddRole extends Option {
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

//sixth option -view all departments-
class ViewAllDepartments extends Option {
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

//seventh option -add department-
class AddDepartment extends Option {
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
module.exports = { ViewAllEmployees, AddEmployee, UpdateEmployeeRole, ViewAllRoles, AddRole, ViewAllDepartments, AddDepartment, Quit };