
const $inputEmail = document.getElementById("inputEmail");
const $inputContr = document.getElementById("inputContraseña");
const $errorEmail = document.getElementById("errorEmail");
const $errorContr = document.getElementById("errorContraseña");
const $inicioSesion = document.getElementById("inicioSesion");

const inputEmailValid = (email) => {
   if(/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email)) {
    return true;
   } else {
    return false;
   }
};

const inputs = [$inputEmail, $inputContr]

let emailValid = false;
let contrValid = false;


inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        if(input.value === "" && input === $inputEmail) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorEmail.innerHTML = "Ingresa tu e-mail";
            emailValid = false;
        }
        if(!(input.value === "") && input === $inputEmail && !inputEmailValid(input.value)) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorEmail.innerHTML = "Ingresa tu e-mail - Ejemplo: hola@gmail.com";
            emailValid = false;
        }
        if(input.value === "" && input === $inputContr) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorContr.innerHTML = "Ingresa tu contraseña";
            contrValid = false;
        }
        if(!(input.value === "") && input === $inputContr && !(input.value.length >= 8)) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorContr.innerHTML = "Ingresa tu contraseña - Debe tener mas de 8 caracteres";
            contrValid = false;
        }
        if(input.value && input === $inputEmail && inputEmailValid(input.value)) {
            input.classList.remove("is-invalid");
            $errorEmail.innerHTML = "";
            input.classList.add("is-valid");
            emailValid = true;
        }
        if(input.value && input === $inputContr && input.value.length >= 8) {
            input.classList.remove("is-invalid");
            $errorContr.innerHTML = "";
            input.classList.add("is-valid");
            contrValid = true;
        }
    })
    input.addEventListener("blur", (e) => {
        if(input.value === "" && input === $inputEmail) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorEmail.innerHTML = "Ingresa tu e-mail";
            emailValid = false;
        }
        if(!(input.value === "") && input === $inputEmail && !inputEmailValid(input.value)) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorEmail.innerHTML = "Ingresa tu e-mail - Ejemplo: hola@gmail.com";
            emailValid = false;
        }
        if(input.value === "" && input === $inputContr) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorContr.innerHTML = "Ingresa tu contraseña";
            contrValid = false;
        }
        if(!(input.value === "") && input === $inputContr && !(input.value.length >= 8)) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            $errorContr.innerHTML = "Ingresa tu contraseña - Debe tener mas de 8 caracteres";
            contrValid = false;
        }
        if(input.value && input === $inputEmail && inputEmailValid(input.value)) {
            input.classList.remove("is-invalid");
            $errorEmail.innerHTML = "";
            input.classList.add("is-valid");
            emailValid = true;
        }
        if(input.value && input === $inputContr && input.value.length >= 8) {
            input.classList.remove("is-invalid");
            $errorContr.innerHTML = "";
            input.classList.add("is-valid");
            contrValid = true;
        }
    })
});


$inicioSesion.addEventListener("click", () => {

    if(!emailValid && !contrValid) {
        $errorEmail.innerHTML = "Ingresa tu e-mail"
        $errorContr.innerHTML = "Ingresa tu contraseña";
    }

    if(!emailValid) {
        $errorEmail.innerHTML = "Ingresa tu e-mail"
    }

    if(!contrValid) {
        $errorContr.innerHTML = "Ingresa tu contraseña";
    }

    if(emailValid && contrValid) {
        sessionStorage.setItem("usuario", $inputEmail.value);
        sessionStorage.setItem("contraseña", $inputContr.value);

        location.href = "https://aramisrodriguez.github.io/proyecto-e_commerce-jap/index.html";
    }

    
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        document.getElementById("name").innerHTML = profile.getName();
        document.getElementById("email").profile.getEmail();
        document.getElementById("image").attr('src', profile.getImageUrl());
        document.getElementById("dataGoo").style.display = "block";
        document.getElementById("botonGoo").style.display = "none";
    }
    
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            alert("You have been signed out successfully");
            document.getElementById("dataGoo").style.display = "none";
            document.getElementById("botonGoo").style.display = "block";
        });
    }

})