const db = require ('../db/query');

const NonMgmtChoices = async () => {
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

const roleChoices = async () => {
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

const deptChoices = async () => {
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

const mgmtChoices = async () => {
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

const empChoices = async () => {
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

module.exports = { NonMgmtChoices, roleChoices, deptChoices, mgmtChoices, empChoices };