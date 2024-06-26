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

// third option -update employee role-
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

//fourth option -view all roles-
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

//fifth option -add role-
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

//sixth option -view all departments-
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

//seventh option -add department-
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

//eighth option -QUIT-
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



//export child options/classes
module.exports = { ViewAllEmployees };