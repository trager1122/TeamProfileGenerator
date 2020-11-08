// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
function Intern(data){
    const engineer= new Employee(data);
    engineer.github=()=>{
        inquirer
            .prompt({type:"input", message: "Which school does the intern currently attend?", name:"school"})
            .then(function(response){
                return response.school;
            })
    }
}

module.exports=Intern;