
let $inputEmail = document.getElementById("inputEmail");
let $inputContr = document.getElementById("inputContraseña");
let $errorEmail = document.getElementById("errorEmail");
let $errorContr = document.getElementById("errorContraseña");
let $inicioSesion = document.getElementById("inicioSesion");

let inputEmailValid = (email) => {
   if(/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email)) {
    return true;
   } else {
    return false;
   }
};

let inputs = [$inputEmail, $inputContr];

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

inputs.forEach((input) => {
    input.addEventListener("keyup", (event) => {
        if(event.code === "Enter") {
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
        
                // location.href = "https://aramisrodriguez.github.io/proyecto-e_commerce-jap/index.html";
                location.href = "../index.html";
            }
        }
    })
})

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

        // location.href = "https://aramisrodriguez.github.io/proyecto-e_commerce-jap/index.html";
        location.href = "../index.html";
    }

})


function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    alert('Name: ' + profile.getName());
  }

  function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
