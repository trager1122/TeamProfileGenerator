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

const team=[];

function ask () {
    inquirer
        .prompt({
            type: "input",
            message: "Would like to add a team member?(y/n)",
            name: "add"
       }).then(answer => {
         if (answer.add !=='y' || answer.add !=='n'){
             throw error;
         }
         else if(answer.add='y') {
            addMember();
         }
         else {render(team)};
       })
}

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
                         message: "What is the employee's e-mail address?",
                         name:"email"
                        }

    ]
    inquirer
        .prompt(empQuestions)
        then(function(answers){
            switch (answers.role) {
                case "Engineer":
                    const addEngineer=new Engineer(answers);
                    inquirer
                        .prompt({type:"input",
                                 message: "What is the engineer's Github username?",
                                 name: "github"
                        })
                        .then(function(answer){
                            addEngineer.getGithub(answer.github)
                        })
                    team.push(addEngineer);
                break;
            
                case "Intern":
                    const addIntern=new Intern(answers);
                    inquirer
                        .prompt({type:"input",
                                 message:"What school does the intern attend?",
                                 name:"school"
                        })
                        .then(function(answer){
                            addIntern.getSchool(answer.school);
                        })
                    team.push(addIntern);
                break;
            }
        })
 ask();
}

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
            const teamMgr=new Manager(answers);
            teamMgr.getRole();
            team.push(teamMgr);
            ask();
        })
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
