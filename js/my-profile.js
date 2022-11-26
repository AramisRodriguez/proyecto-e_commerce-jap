let $pNombre = document.getElementById("pNombre");
let $sNombre = document.getElementById("sNombre");
let $pNombreError = document.getElementById("pNombreError");
let $pApellido = document.getElementById("pApellido");
let $sApellido = document.getElementById("sApellido");
let $pApellidoError = document.getElementById("pApellidoError");
let $mail = document.getElementById("mail");
let $telefonoContacto = document.getElementById("telefonoContacto");
let $telefonoContactoError = document.getElementById("telefonoContactoError");
let $guardarCambios = document.getElementById("guardarCambios");
let $imagenPerfilArchivo = document.getElementById("imagenPerfil");
let $imagenPerfilContenedor = document.getElementById("imagenPerfilContenedor");



document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("user").innerHTML = sessionStorage.usuario;
    
 
    async function encodeFileAsBase64URL(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                resolve(reader.result);
            });
            reader.readAsDataURL(file);
        });
    };

    let base64URL = "";
    $imagenPerfilArchivo.addEventListener('input', async (event) => {
        base64URL = await encodeFileAsBase64URL($imagenPerfilArchivo.files[0]);
        $imagenPerfilContenedor.src = base64URL;
    });

  
    if(sessionStorage.imagenPerfil){
        $imagenPerfilContenedor.src = sessionStorage.imagenPerfil;
    }
    if(sessionStorage.pNombre){
        $pNombre.value = sessionStorage.pNombre; 
    }
    if(sessionStorage.sNombre){
        $sNombre.value = sessionStorage.sNombre;
    }
    if(sessionStorage.pApellido){
        $pApellido.value = sessionStorage.pApellido;
    }
    if(sessionStorage.sApellido){
        $sApellido.value = sessionStorage.sApellido;
    }
    if(sessionStorage.usuario){
        $mail.value = sessionStorage.usuario;
    }
    if(sessionStorage.telefonoContacto){
        $telefonoContacto.value = sessionStorage.telefonoContacto;
    }




    $guardarCambios.addEventListener("click", () => {

        if($pNombre.value === ""){
            $pNombreError.hidden = false;
        } else {
            $pNombreError.hidden = true;
        }

        if($pApellido.value === ""){
            $pApellidoError.hidden = false;
        } else {
            $pApellidoError.hidden = true;
        }

        if($telefonoContacto.value === ""){
            $telefonoContactoError.hidden = false;
        } else {
            $telefonoContactoError.hidden = true;
        }


        if($pNombre.value !== "" && $pApellido.value !== "" && $telefonoContacto.value !== ""){
            
            sessionStorage.setItem("pNombre", $pNombre.value);
            sessionStorage.setItem("sNombre", $sNombre.value);
            sessionStorage.setItem("pApellido", $pApellido.value);
            sessionStorage.setItem("sApellido", $sApellido.value);
            sessionStorage.setItem("telefonoContacto", $telefonoContacto.value);
            sessionStorage.setItem("imagenPerfil", base64URL);

        }
        

    })

});
