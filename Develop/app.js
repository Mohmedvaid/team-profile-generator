const Employee = require("./lib/Employee.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
let empData;
let managerData;
let empList;
let totalEmp = true;

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
        message: "Enter name ID: ",
        name: "ID",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
  managerData.title = "Manager";
  console.log(managerData);
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
        message: "Enter the employee role (Intern or Engineer ): ",
        name: "role",
      },
      {
        type: "input",
        message: "Enter the employee ID: ",
        name: "ID",
      },
    ]);
    empList= await getSpecial(empData);
  } catch (err) {
    console.log(err);
  }
  //getSpecial(empData);
}

// check the employee type in order to ask the next question
async function getSpecial(empData) {
try {
  switch (empData.role.toUpperCase()) {
    case "INTERN":
      empData.school = await inquirer.prompt({
        message: `Enter the school name: `,
        name: "school",
      });
      break;
    case "ENGINEER":
      empData.githib = await inquirer.prompt({
        message: `Enter the githib url: `,
        name: "githib",
      });
      break;
  }
  return empData;
} catch (error) {
  console.log(error);
}
  
}

getManagerInfo();
