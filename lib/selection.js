const db = require ('../db/query');

const NonManagementChoices = async () => {
    const tempArr = await db.getNonManagers();
    const choices = tempArr[0];
    let choicesArr = [];

    choices.forEach(element => {
        let valueObj = {
            name: element.employee_name,
            value: element.id
        }
        choicesArr.push(valueObj);
    })
    return choicesArr;
}

const roleChoice = async () => {
    const tempArr = await db.getRoleIds();
    const choices = tempArr[0];
    let choicesArr = [];

    choices.forEach(element => {
        let valueObj = {
            name: element.title,
            value: element.id
        }
        choicesArr.push(valueObj);
    })
    return choicesArr;
}

const departmentChoice = async () => {
    const tempArr = await db.getDepts();
    const choices = tempArr[0];
    let choicesArr = [];

    choices.forEach(element => {
        let valueObj = {
            name: element.department_name,
            value: element.id
        }
        choicesArr.push(valueObj);
    });
    return choicesArr;
}

const managementChoice = async () => {
    const tempArr = await db.getManagers();
    const choices = tempArr[0];
    let choicesArr = [];

    choices.forEach(element => {
        let valueObj = {
            name: element.manager_name,
            value: element.id
        }
        choicesArr.push(valueObj);
    })
    return choicesArr;
}

const employeeChoice = async () => {
    const tempArr = await db.getEmpRaw();
    const choices = tempArr[0];
    let choicesArr = [];

    choices.forEach(element => {
        let valueObj = {
            name: element.first_name + '' + element.last_name,
            value: element.id
        }
        choicesArr.push(valueObj);
    })
    return choicesArr;
}

module.exports = { NonManagementChoices, roleChoice, departmentChoice, managementChoice, employeeChoice };