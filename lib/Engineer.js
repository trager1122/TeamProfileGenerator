// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
function Engineer(){
    const engineer= new Employee(data);
    engineer.github=()=>{
        inquirer
            .prompt({type:"input", message: "What is your GitHub username?", name:"github"})
            .then(function(response){
                return response.github;
            })
    }
}

module.exports=Engineer;