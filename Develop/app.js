
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
  let temphtml;
  try {
    while (totalEmp) {
      await getInfo();

      let confirm = await inquirer.prompt({
        message: `Would you like to add more more members? (YES/NO): `,
        name: `more`,
      });
      if (confirm.more.toUpperCase() == `NO`) {
        totalEmp = false;
        temphtml = await builder(empList);
        console.log(temphtml)
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

 function builder(empList) {

  let color;
  let special;
  let hardSpecial;
  let textColor;
  let block;
  for(var i = 1; i<empList.length; i++){

    switch(empList[i].getRole()){
      case `Intern`: 
      color = 'border-dark'
      textColor = 'text-dark'
      hardSpecial = `School`
      special = empList[i].getSchool()
      break;

      case `Engineer`: 
      color = `border-primary`
      textColor = 'text-primary'
      hardSpecial = `Github URL`
      special = empList[i].getGithub()
      break;
    }
     return block =`<div class="card ${ color} mb-3" style="max-width: 18rem;">
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

    // let mainHTML = `<!doctype html>
    // <html lang="en">
    //   <head>
    //     <!-- Required meta tags -->
    //     <meta charset="utf-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    //     <!-- Bootstrap CSS -->
    //     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    //     <style>
    //         .navbar{
    //             background-color: #90e0ff;
    //         }
    
    //         .col{
    //             background-color: red;
    //             border: 1px solid black
    //         }
    //         .row{
    //             background-color: red;
    //             border: 2px solid green;
    //         }
    //         .manager{
    //             text-align: center;
    //         }
    //     </style>
    
    //     <title>Team Builder!</title>
    //   </head>
    //   <body>
    //       <!-- Nav bar -->
    //       <nav class="navbar">
    //           <div class="container justify-content-center" id="nav">
    //             My Team!
    //           </div>
    //     </nav>
    
    //       <!-- Main container -->
    //     <div class="container">        
    //         <!-- row1 -->
    //         <div class="row">
    //             <div class="col manager">
    //                 ${block}
    //             </div>
    //         </div>
    //         <!-- row2 -->
    //         <div class="row">
    //             <div class="col">
    //                 row 2 col 1
    //             </div>
    //             <div class="col">
    //                 row 2 col 2
    //             </div>
    //             <div class="col">
    //                 row2 col 3
    //             </div>
    
    //         </div>
    
    //     </div>
    
    //     <!-- Optional JavaScript -->
    //     <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    //     <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    //     <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    //     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    //     <script type="text/javascript" src="./app.js"></script>
    //   </body>
    // </html>
    // `


  }
    
}

getManagerInfo();


