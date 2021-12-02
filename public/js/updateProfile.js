window.addEventListener('load', function() {

let updateButton = document.querySelector("#change-button");
let submitButton = document.querySelector("#submit-button");
let inputs = document.querySelectorAll("input");

updateButton.addEventListener("click", function (){
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }
    updateButton.classList.toggle("hidden");
    submitButton.classList.toggle("hidden");
})

})