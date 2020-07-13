const electron = require("electron");
const { ipcRenderer } = electron;



const reqFields = document.querySelectorAll('[required]')

for(let field of reqFields){
    field.addEventListener('invalid', processor)
}


//FUNTIONS
function processor(event){
    
    const field = event.target    
    
    function validateInput(){
        let foundError = false
        
        if(field.validity["valueMissing"]) foundError = true        
        
        return foundError
    }

    const erro = validateInput()

    if(erro){
        //CUSTOM ERROR MSG
        field.setCustomValidity('This field in required!')
    }else{
        field.setCustomValidity('')
    }
    


}

// function validateInput() {
//     let x = document.getElementById("hht").value;
//     let y = document.getElementById("user").value;
//     if (parseInt(x) !== /^[0-9]*$/gm || parseInt(y) !== /^[0-9]*$/gm) {
//       alert("Only use numbers!");
//       resetForm();
//       return;
//     }
//   }


//SUBMIT FORM IF EVERYTHING IS OK
document.querySelector('form')
    .addEventListener('submit', event => {
        console.log('Sending...');
        event.preventDefault()       
    })