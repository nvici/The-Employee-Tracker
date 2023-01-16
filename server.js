const inquirer = require('inquirer');
const selectHelper = require('./lib/selection');

const db = require('./db/query');
const cTable = require('console.table');

const trackEmployees = () => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'request',
      message: 'What would you like to do?',
      choices: ['View All Employees',
                'Add an Employee',
                'Update Employee Role',
                'Update Employees Manager',
                'View Employees by Department',
                'View Employees by Manager',
                'Delete an Employee',
                'View All Roles',
                'Add a Role',
                'View All Departments',
                'Add a Department',
                'View Department Budget',
                'Quit'
                ],              
        loop: false,
    },
  ])
  
  .then((data) => {
    const {request} = data;
    console.log(request);

    switch (request){
      case 'View All Employees':
        viewEmployees();
        break;
      
      case 'Add an Employee':
        createEmply();
        break;

      case 'Update Employee Role':
        remakeEmployeeRole();
        break;

      case 'Update Employees Manager':
        remakeEmployeeManager();
        break;

      case 'View Employees by Department':
        viewEmployeesByDeptarment();
        break;

      case 'View Employees by Manager':
        viewEmployeeByManager();
        break;

      case 'Delete an Employee':
        deleteEmployee();
        break;

      case 'View All Roles':
        viewRoles();
        break;

      case 'Add a Role':
        createRole();
        break;

      case 'View All Departments':
        viewDepartments();
        break;

      case 'Add a Department':
        createDept();
        break;
       
      case 'View Department Budget':
        viewBudgets();
        break;

      default:
        break;

    }
  })
};

//creates a new Dept
const createDept = async () => {

  const department = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Department?",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log("Please enter a department name!");
          return false;
        }
      }
    }
  ]);

  await db.createDepts(department);

  trackEmployees();
}
//creates Employee
const createEmply = async() => {

  const roleArr = await selectHelper.roleChoices();

  const mgmtArr = await selectHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "input",
      name: "first",
      message:  "First Name?",
      validate: (first) => {
        if (first && isNaN(first)) {
          return true;
        } else {
          console.log ("Please enter a name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "last",
      message: "Last Name?",
      validate: (last) => {
        if (last && isNaN(last)){
          return true;
        } else {
          console.log ("Please enter a last name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "role_id",
      message: "Employee's role?",
      choices: roleArr,
      loop: false,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Employee's manager?",
      choices: mgmtArr,
      loop: false,
    }
  ]);

  await db.addEmployee(emp);

  trackEmployees();

}


//creates Role for employee
const createRole = async () => {

  const choicesArr = await selectHelper.deptChoices();

  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Employee's role?",
      validate: (title) => {
        if (title) {
          return true;
        } else {
          console.log("Please enter the employee's role!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "salary",
      message: "salary?",
      validate: (salary) => {
        if(salary && !isNaN(salary)){
          return true;
        } else {
          console.log("Please enter the salary!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "department_id",
      message: "What department is the role associated to?",
      choices: choicesArr,
      loop: false,
    }
  ]);

  await db.createRoles(role);

  trackEmployees();

}

//deletes an Employee
const deleteEmployee = async () => {
  const empArr = await selectHelper.NonMgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What Employee do you want to Delete?",
      choices: empArr,
      loop: false,
    }
   ]);

  await db.deleteEmployees(emp);

  trackEmployees();

}

//update the Employee
const remakeEmployeeRole = async () => {

  const roleArr = await selectHelper.roleChoices();
  const empArr = await selectHelper.empChoices();
  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Enter employee's id that you want to update.",
      choices: empArr,
      loop: false,
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the role of the employee?",
      choices: roleArr,
      loop: false,
    }
  ]);

  await db.remakeEmployeeRoleById(emp);

 trackEmployees();

}

//update employee's manager
const remakeEmployeeManager = async () => {

  const empArr = await selectHelper.NonMgmtChoices();
  const mgmtArr = await selectHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Enter employee's name that you would like to update.",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Employees manager?",
      choices: mgmtArr,
      loop: false,
    }
  ]);

  await db.remakeEmployeeManagerById(emp);

  trackEmployees();

}

//view list of Depts
const viewDepartments = () => {
  db.getDepts()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    trackEmployees();
  })
    
}

//Get all roles available
const viewRoles = () => {
  db.getRoles()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    trackEmployees();
  })
}

//Get all employees
const viewEmployees = () => {
  db.getEmps()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    trackEmployees();
  })
}

//Show budgets by department
const viewBudgets = async () => {
  db.getBudgetByDepartment()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    trackEmployees();
  })
}

//employees shown by department
const viewEmployeesByDeptarment = async () => {

const deptArr = await selectHelper.deptChoices();

inquirer.prompt([
  {
    type: "list",
    name: "dept_id",
    message: "Which department is the employee located?",
    choices: deptArr,
    loop: false
  }
])

.then((data) => {
  db.getEmployeeByDepartmentId(data)

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows))
    trackEmployees();
  })
})

}
// view employees by which manager they work for
const viewEmployeeByManager = async () => {
  const mgmtArr = await selectHelper.mgmtChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Which manager is the employee located?",
      choices: mgmtArr,
      loop: false
    }
  ])

  .then((data) => {
    db.getEmployeesByManagerId(data)
    .then(([rows]) => {
      console.log('\n');
      console.log(cTable.getTable(rows));
      trackEmployees();
    })
  })

}


trackEmployees();