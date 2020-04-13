const Employee = require("./lib/Employee.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
let empData;
let managerData;
let empList = [];
let totalEmp = true;
let i = 0;

async function moreEmp() {
  try {
    while (totalEmp) {
      await getInfo();

      let confirm = await inquirer.prompt({
        message: `Would you like to add more more members? (YES/NO): `,
        name: `more`,
      });
      if (confirm.more.toUpperCase() == `NO`) {
        totalEmp = false;
        builder(empList);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

//to get manager's info
async function getManagerInfo() {
  try {
    console.log(`Enter the team managers information!`);
    managerData = await inquirer.prompt([
      {
        type: "input",
        message: "Enter name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Enter ID: ",
        name: "ID",
      },
      {
        type: "input",
        message: "Enter email:  ",
        name: "email",
      },
      {
        type: "input",
        message: "Enter office number:  ",
        name: "office",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
  empList[i] = new Manager(managerData.name, managerData.ID, managerData.email, managerData.office);
  i++;
  moreEmp();
}

//get employee info
async function getInfo() {
  console.log(`Enter the team members information`);
  try {
    empData = await inquirer.prompt([
      {
        type: "input",
        message: "Enter the employee name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Enter the employee ID: ",
        name: "ID",
      },
      {
        type: "input",
        message: "Enter the employee email: ",
        name: "email",
      },
      {
        type: "input",
        message: "Enter the employee role (Intern or Engineer ): ",
        name: "role",
      },
    ]);
     await getSpecial(empData);
  } catch (err) {
    console.log(err);
  }
}

// check the employee type in order to ask the next question
async function getSpecial(empData) {
  try {
    var temp;
    switch (empData.role.toUpperCase()) {
      case "INTERN":
        temp = await inquirer.prompt({
          message: `Enter the school name: `,
          name: "special",
        });
        createIntern(empData, temp)
        break;
      case "ENGINEER":
        temp = await inquirer.prompt({
          message: `Enter the githib url: `,
          name: "special",
        });
        createEngineer(empData, temp)
        break;
    }
    console.log(empList);
  } catch (error) {
    console.log(error);
  }
}

//object builders
async function createIntern(empData, temp) {
  empList[i] = new Intern(empData.name, empData.ID, empData.email, temp.special);
  i++;
}

async function createEngineer(empData, temp) {
  empList[i] = new Engineer(empData.name, empData.ID, empData.email, temp.special);
  i++;
}

//html builder

async function builder(empList) {

  let color;
  let special;
  let hardSpecial;
  let textColor;
  for(var i = 0; i<empList.length; i++){

    switch(empList[i].getRole){
      case `Intern`: 
      borderColor = 'border-dark'
      textColor = 'text-dark'
      hardSpecial = `School`
      special = empList[i].getSchool()
      break;

      case `Engineer`: 
      color = `border-primary`
      textColor = 'text-primary'
      hardSpecial = `Github URL`
      special = empList[i].getSchool()
      break;
    }


    let block =`<div class="card ${color} mb-3" style="max-width: 18rem;">
    <div class="card-header">${empList[i].getRole()}</div>
    <div class="card-body ${textColor}">
      <h5 class="card-title">${empList[i].getName()}</h5>
      <dl class="row">
      <dt class="col-sm-3">ID: </dt>
      <dd class="col-sm-9">${empList[i].getId()}</dd>
      <dt class="col-sm-3">Email: </dt>
      <dd class="col-sm-9">${empList[i].getEmail()}</dd>
      <dt class="col-sm-3">${hardSpecial}</dt>
      <dd class="col-sm-9">${special}</dd>
      </dl>
    </div>
  </div>`

  document.getElementsByClassName(`manager`).appendChild(block)

  }
    
}

getManagerInfo();