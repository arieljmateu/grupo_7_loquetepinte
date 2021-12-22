window.addEventListener("load", function(){
    const name = document.querySelector("#name")
    const description = document.querySelector("#description")
    const image = document.querySelector("#image")

    const formu = document.querySelector("#form")

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.text-danger');

        errorDisplay.textContent = message;
    }

    const noError = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.text-danger');

        errorDisplay.textContent = '';
    }

    const validateName = (_input) => {
        if (_input.value.length < 5 ) {
            setError(_input, "El nombre debe tener al menos 5 caracteres");
            return false;
        } else {
            noError(_input);
            return true;
        }
    }

    const validateDesc = (_input) => {
        if (_input.value.length < 20 ) {
            setError(_input, "La descripción debe tener al menos 20 caracteres");
            return false;
        } else {
            noError(_input);
            return true;
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

    name.addEventListener("blur",  () => validateName(name));
    description.addEventListener("blur",   () => validateName(description));
    image.addEventListener("blur",      () => validateFile(image));

    formu.addEventListener("submit", function(event){
        event.preventDefault();

        let validInputs = validateName(name);
        validInputs &= validateDesc(description);
        validInputs &= validateFile(image);

        if (validInputs) {
            formu.submit();
        }
    })
})