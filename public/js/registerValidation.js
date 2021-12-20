window.addEventListener("load", function(){

let password = document.querySelector("#password")
let firstName = document.querySelector("#first_name")
let email = document.querySelector("#email")
let form = document.querySelector(".formu")
let image = document.querySelector("#label")



/* firstName.addEventListener ("blur",function(){
    console.log(firstName.value.length)
    if (firstName.value.length <= 2 ) {
        firstName.helperText =  "El nombre tiene que tener al menos 2 caracteres";
    }
})

password.addEventListener ("blur",function(){
    console.log(password.value.length)
    if (password.value.length <= 8 ) {
        // alert ("La contraseña tiene que tener al menos 8 caracteres")
    }
})
*/
/* image.addEventListener ("submit",function(){
//    if (image.match || jpg|jpeg|png ) {
//        alert ("La imagen debe ser algun de estos tipos gif,jpg,jpeg,png")
//    }
 })*/

form.addEventListener("submit",function(event){
    let error = [];
    
    if (firstName.value <= 2){
        error.push ("El nombre tiene que tener al menos 2 caracteres")
        firstName.classList.add("is-invalid")
    } else {
        firstName.classList.add("is-valid")
    }
    if (password.value <= 8 ) {
        error.push ("La contraseña tiene que tener al menos 8 caracteres")
        password.classList.add("is-invalid")
    } else {
        password.classList.add("is-valid")
    }
console.log(error)
    if (error.length > 0){
        event.preventDefault();
        let ulErrores = document.querySelector(".error")
        for (let i = 0; i < error.length; i++ ){
            ulErrores.innerHTML += "<li>" + error[i] + "</li>"
        }
    }
})

})