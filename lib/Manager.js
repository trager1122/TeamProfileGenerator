// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
function Manager(data){
    const manager=new Employee(data);
    this.officeNumber=()=>{
        inquirer
            .prompt({type:"input", message:"What is the manager's office number?", name: "officenumber"})
            .then(function(response){
                return response.officenumber;
            })
    }
}

module.exports=Manager;