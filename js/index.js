document.addEventListener("DOMContentLoaded", function(){
    
    if(!(sessionStorage.usuario) && !(sessionStorage.contraseña)) {
        location.href = "https://aramisrodriguez.github.io/proyecto-e_commerce-jap/login.html";
        // location.href = "../login.html";
    }


    document.getElementById("usuario").innerHTML = sessionStorage.usuario;




    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});