window.addEventListener("load", function(){
    const firstName = document.querySelector("#first_name")
    const lastName = document.querySelector("#last_name")
    const password = document.querySelector("#password")
    const password2 = document.querySelector("#password2")
    const email = document.querySelector("#email")
    const image = document.querySelector("#image")

    const formu = document.querySelector("#form")

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.input-invalid');

        errorDisplay.textContent = message;
    }

    const noError = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.input-invalid');

        errorDisplay.textContent = '';
    }

    const validateName = (_input) => {
        if (_input.value.length < 2 ) {
            setError(_input, "El nombre debe tener al menos 2 caracteres");
            return false;
        } else {
            noError(_input);
            return true;
        }
    }

    const validateEmail = (_input) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_input.value)) {
            noError(_input);
            return true;
        } else {
            setError(_input, "Debes ingresar un email válido");
            return false;
        }
    }

    const validatePassword = (_input) => {
        if (/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,64}$/.test(_input.value) ) {
            noError(_input);
            return true;
        } else {
            setError(_input, "Deberá tener al menos 8 caractéres, un letra mayúscula, un minúscula, un número y un carácter especial");
            return false;
        }
    }

    const validateFile = (_input) => {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (!allowedExtensions.test(_input.value)) {
            setError(_input, "La imagen debe ser algun de estos tipos gif,jpg,jpeg,png");
            return false
        } else {
            noError(_input);
            return true;
        }
    }

    firstName.addEventListener("blur",  () => validateName(firstName));
    lastName.addEventListener("blur",   () => validateName(lastName));
    email.addEventListener("blur",      () => validateEmail(email));
    password.addEventListener("blur",   () => validatePassword(password));
    password2.addEventListener("blur",  () => validatePassword(password2));
    image.addEventListener("blur",      () => validateFile(image));

    formu.addEventListener("submit", function(event){
        event.preventDefault();

        let validInputs = validateName(firstName);
        validInputs &= validateName(lastName);
        validInputs &= validateEmail(email);
        validInputs &= validatePassword(password);
        validInputs &= validatePassword(password2)
        validInputs &= validateFile(image);

        if (validInputs) {
            formu.submit();
        }
    })
})