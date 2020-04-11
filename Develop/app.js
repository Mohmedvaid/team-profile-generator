const Employee = require("./lib/Employee.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
let empData;

async function getInfo() {
  try {
    empData = await inquirer.prompt([
      {
        type: "input",
        message: "Enter the employee name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Enter the employee role (Intern, Engineer or Manager): ",
        name: "role",
      },
      {
        type: "input",
        message: "Enter the employee ID: ",
        name: "ID",
      },
    ]);
  } catch (err) {
    console.log(err);
  }
  getSpecial(empData);
}

getInfo();

async function getSpecial(empData) {
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
    case "MANAGER":
      empData.office = await inquirer.prompt({
        message: `Enter the office number: `,
        name: "office",
      });
  }
}
