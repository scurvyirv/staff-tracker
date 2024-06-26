INSERT INTO departments (department_name)
VALUES ('Sales'),
       ('Finance'),
       ('Engineering'),
       ('Legal'),
       ('Medical');

INSERT INTO roles (title, salary, department)
VALUES ('Sales Manager', 120000, 1),
       ('Salesperson', 70000, 1),
       ('Finance Lead', 100000, 2),
       ('Financial Advisor', 80000, 2),
       ('Computer Engineer', 150000, 3),
       ('Electric Engineer', 140000, 3),
       ('Lawyer', 170000, 4),
       ('Medical Director', 250000, 5),
       ('Nurse', 130000, 5);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, null),
       ('Jean', 'Grey', 2, 1),
       ('Hal', 'Jordan', 3, null),
       ('Carl', 'White', 4, 3),
       ('Ken', 'Beach', 5, null),
       ('Sarah', 'Tonin', 6, null),
       ('Allison', 'Wonderland', 7, null),
       ('Ryan', 'Blue', 8, null),
       ('Cal', 'Dirk', 9, 8);


