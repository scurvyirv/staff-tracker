--1st View All Employees--
SELECT
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
roles on departments.id = roles.department_id

JOIN 
employees on departments.id = employees.role_id

LEFT JOIN 
employees AS managers ON employees.manager_id = managers.id;

--6th View All Departments--
SELECT
departments.id AS id,
departments.department_name AS department

FROM 
departments

JOIN 
roles.department ON department_name = department.id;

--4th View All Roles--
SELECT
departments.id AS id, 
roles.title AS title,
departments.department_name AS department,
roles.salary AS salary

FROM 
departments

JOIN
roles ON departments.id = roles.department_id;
