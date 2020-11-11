const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

//Array to store in which team members are stored
const team=[];

// Function to ask whether manager would like to 
function ask () {
    inquirer
        .prompt({
            type: "confirm",
            message: "Would like to add a team member?",
            name: "add"
        })
       .then(answer => {
        if(answer.add === true) {
            addMember();
        }
        else {renderFile()};
       })
}

// Function for adding an engineer or intern to the team
function addMember() {
    const empQuestions=[{type:"list",
                         name:"role",
                         message:"What type of employee are you adding?",
                         choices:["Engineer", "Intern"]
                        },
                        {type:"input",
                         message:"What is the employee's name?",
                         name: "name"
                        },
                        {type:"input",
                         message:"What is the employee's id?",
                         name:"id"
                        },
                        {type:"input",
                         message: "What is the employee's e-mail address?",
                         name:"email"
                        }
                    ];

    inquirer
        .prompt(empQuestions)
        .then(function(answers){
            switch (answers.role) {
                case "Engineer":
                    inquirer
                    .prompt({type:"input",
                    message: "What is the engineer's Github username?",
                    name: "github"
                })
                .then(function(answer){
                    const addEngineer=new Engineer(answers.name,answers.id,answers.email,answer.github);
                    addEngineer.role=answers.role;
                    team.push(addEngineer);
                    ask();
                })
                
                break;
                
                case "Intern":
                    inquirer
                    .prompt({type:"input",
                    message:"What school does the intern attend?",
                    name:"school"
                })
                .then(function(answer){
                    const addIntern=new Intern(answers.name,answers.id,answers.email,answer.school);
                    addIntern.role=answers.role;
                    team.push(addIntern);
                    ask();  
                })
                
                break;
            }
        })
}

// Main function for the program beginning with adding a manager for the software team
function init(){
    const mgrQuestions = [{type: "input",
                        message: "What is the manager's name?",
                        name: "name"
                    },
                    {type: "input",
                    message: "What is the manager's e-mail address?",
                    name: "email"
                   },
                   {type: "input",
                    message: "What is the manager's id?",
                    name: "id"
                   },
                   {type: "input",
                    message: "What is the manager's office number?",
                    name: "officeNumber"
                   }
];
    inquirer
        .prompt(mgrQuestions)
        .then(answers=>{
            const teamMgr =new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMgr.role='Manager';
            team.push(teamMgr);
            addMember();
        })
}

// Call to begin app
init();


// Renders HTML for Team Profile
function renderFile(){
    fs.writeFileSync(outputPath, render(team),"utf-8");
}
