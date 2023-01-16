const db = require('./connection'); 

  class dbQuery {
      constructor(db){
          this.db = db;
      }
  

  createDepts(data) {
      const values = [data.name];
      return this.db
      .promise()
      .query(
          `INSERT INTO department (department_name) VALUES(?)`,
          values
      );
  }

  createRoles(data) {
      const values = [data.department_id, data.title, data.salary];
      return this.db
      .promise()
      .query(
          `INSERT INTO role
          (department_id, title, salary)
          VALUES(?,?,?)`,
          values
      );
  }

  addEmployee(data) {
      const values = [data.role_id, data.first, data.last, data.manager_id];
      return this.db
      .promise()
      .query(
          `INSERT INTO Employee
          (role_id, first_name, last_name, manager_id)
          values(?,?,?,?)`,
          values
      );
  }

  deleteEmployees(data) {
      const values = [data.emp_id];
      return this.db
      .promise()
      .query(
          `DELETE FROM employee
          where id = ?`,
          values
      );
  }

  remakeEmployeeRoleById(data) {
      const values = [data.role_id, data.emp_id];
    return this.db
    .promise()
    .query(
        `UPDATE employee
        set role_id = ?
        WHERE id = ?`,
        values
    );
  }

  remakeEmployeeManagerById(data) {
      const values = [data.manager_id, data.emp_id];
      return this.db
      .promise()
      .query(
          `UPDATE Employee
          SET manager_id = ?
          WHERE id = ?`,
          values
      );
  }

  getDepts() {
      return this.db
      .promise()
      .query(
          `SELECT * 
          FROM department`
      );
  }

  getEmployeeByDeptartmentId(data) {
      const values = [data.department_id]
      return this.db
      .promise()
      .query(
          `SELECT emp.first_name as "First Name",
          emp.last_name as "Last Name",
          d.department_name as "Department"
          FROM employee emp
          INNER JOIN role r
          ON emp.role_id = r.id
          INNER JOIN department d
          ON r.department_id = d.id
          WHERE d.id = ?`,
          values
      );
  }

  getEmployeesByManagerId(data) {
      const values = [data.manager_id];
      return this.db
      .promise()
      .query(
          `SELECT emp.first_name AS "First Name",
                emp.last_name AS "Last Name",
                CONCAT (mgmt.first_name, '', mgmt.last_name) AS Manager
            FROM employee emp
            INNER JOIN employee mgmt
            ON emp.manager_id = ?`,
            values
      )
  }

  getBudgetByDepartment() {
      return this.db
      .promise()
      .query(
          `SELECT d.department_name AS Department,
                SUM(r.salary) AS Budget
            FROM role r
            INNER JOIN department d
            ON r.department_id = d.id
            GROUP BY department_name`,
      );
  }

  getRoles() {
      return this.db
      .promise()
      .query(
          `SELECT r.title AS Title,
                r.salary AS Salary,
                d.department_name AS Department
                FROM role r
                LEFT JOIN department d
                ON r.department_id = d.id
                ORDER BY Department, r.id ASC`
      );
  }

  getRoleIds() {
      return this.db
      .promise()
      .query(
          `SELECT *
          FROM role;`
      );
  }

  getEmps() {
      return this.db
      .promise()
      .query(
          `SELECT emp.id as "Employee_ID",
                emp.first_name AS "First_Name",
                emp.last_name AS "Last_Name",
                department.department_name AS Department,
                role.salary AS Salary,
                role.title AS Role,
                CONCAT (mgmt.first_name, '', mgmt.last_name) as Manager
            FROM employee emp
            LEFT JOIN employee mgmt
            ON emp.manager_id = mgmt.id
            INNER JOIN role
            ON emp.role_id = role.id
            LEFT JOIN department
            ON role.department_id = department.id
            ORDER BY emp.id;`
      );
  }

  getEmpRaw() {
      return this.db
      .promise()
      .query(
          `SELECT emp.id,
          emp.first_name,
          emp.last_name
          FROM employee emp;`
      )
  }

  getNonManagers(){
    return this.db
    .promise()
    .query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name
    FROM employee 
    WHERE manager_id IS NOT NULL`
  )
  }

  getManagers() {
    return this.db
      .promise()
      .query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name
      FROM employee 
      WHERE manager_id IS NULL`
    )
  }

  }
  module.exports = new dbQuery(db);