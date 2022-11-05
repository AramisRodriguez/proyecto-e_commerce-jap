let log = (x) => console.log(x);

let dataCart = [];
let deleteList = document.getElementsByName("delete");
let urlCart = CART_INFO_URL + 25801 + EXT_TYPE;

let $showCart = document.getElementById("container");

let $calle = document.getElementById("calle");
let $numeroPuerta = document.getElementById("numeroPuerta");
let $esquina = document.getElementById("esquina");
let $calleE = document.getElementById("calleE");
let $numeroPuertaE = document.getElementById("numeroPuertaE");
let $esquinaE = document.getElementById("esquinaE");

let $envioPremium = document.getElementById("premium");
let $envioExpress = document.getElementById("express");
let $envioStandard = document.getElementById("standard");

let $subtotalTotal = document.getElementById("subtotal-total");
let $costoEnvio = document.getElementById("costo-envio");
let $total = document.getElementById("total");

let buyProductList = [];
let envioValues = [$envioExpress, $envioPremium, $envioStandard];

let productValues = document.getElementsByName("productValue");
let inputValues = document.getElementsByName("inputCart");
let subtotals = document.getElementsByName("subtotal");

let $tarjCreditoCheck = document.getElementById("tarjetaCreditoCheck");
let $numeroTarjeta = document.getElementById("numeroTarjeta");
let $codigoSegTarj = document.getElementById("codigoSeg");
let $vencimientoTarj = document.getElementById("vencimiento");
let $transferenciaBancariaCheck = document.getElementById("transferenciaBancariaCheck");
let $numeroCuenta = document.getElementById("numeroCuenta");

let $tipoPago = document.getElementById("tipoPago");
let $tipoPagoE = document.getElementById("tipoPagoE");
let $tipoPagoCamposE = document.getElementById("tipoPagoCamposE");
let $productosE = document.getElementById("productosE");

let $compraExitosa = document.getElementById("compraExitosa");
let $btnCompra = document.getElementById("btnCompra");

let valueInputsValid = false;
let pago = false;

let formasPago = [$tarjCreditoCheck, $transferenciaBancariaCheck];


function createListProducts(){
    let list = JSON.parse(localStorage.getItem("buyProductList"));
    list.forEach((element) => {
        buyProductList.push(element);
    })
}


function subtotal(){

    for (let i = 0; i < inputValues.length; i++) {
   
        if(inputValues[i].value > 0){
            
            let subtotal = parseFloat(inputValues[i].value) * parseFloat(productValues[i].innerHTML);
            subtotals[i].innerHTML = subtotal;

        }
        
    }

}

function calcularTotal(){

    let subtotal = 0;

    for (let i = 0; i < productValues.length; i++) {
        
        if(inputValues[i].value > 0){

            subtotal += parseFloat(productValues[i].innerHTML) * parseFloat(inputValues[i].value);

        }

    }
    
    $subtotalTotal.innerHTML = subtotal;


    
    let costoEnvio = 0;

    envioValues.forEach(element => {

        if($envioPremium.checked){
            costoEnvio = parseFloat($subtotalTotal.innerHTML) * 0.15;
        }
        if($envioExpress.checked){
            costoEnvio = parseInt(parseFloat($subtotalTotal.innerHTML) * 0.07);
        }
        if($envioStandard.checked){
            costoEnvio = parseFloat($subtotalTotal.innerHTML) * 0.05;
        }

    })    

    $costoEnvio.innerHTML = costoEnvio;



    $total.innerHTML = parseFloat($subtotalTotal.innerHTML) + parseFloat($costoEnvio.innerHTML);

}



function eliminar(posicion){
    buyProductList.splice(posicion,1);
    showDataCart();
}


function showDataCart(){

    $showCart.innerHTML = `
    <div class="row p-1 mt-3" style="border-bottom: 2px solid black">
        <div class="col fw-bold " ></div>
        <div class="col fw-bold " >Nombre</div>
        <div class="col fw-bold " >Costo</div>
        <div class="col fw-bold " >Cantidad</div>
        <div class="col fw-bold " >Subtotal</div>
        <div class="col fw-bold " ></div>
    </div>
    `;

    for (let i = 0; i < buyProductList.length; i++) {

        $showCart.innerHTML += `
        <div id="tableCart" class="row p-1 mt-1">
            <div class="col" ><img src="${buyProductList[i].image}" style="width: 80px" alt=""></div>
            <div class="col" >${buyProductList[i].name}</div>
            <div class="col d-flex" ><div>${buyProductList[i].currency}&nbsp</div><div  name="productValue" id="productValue${i}" >${buyProductList[i].unitCost}</div></div>
            <div class="col" ><input type="number" name="inputCart" id="inputCart${i}" style="width: 60px" value="1" onchange="subtotal()" ></div>
            <div class="col fw-bold d-flex"><div>${buyProductList[i].currency}&nbsp</div><div  name="subtotal" id="subtotal${i}" >${buyProductList[i].unitCost}</div></div>
            <div class="col"><button type="button" class="btn btn-outline-danger" name="delete"><i class="fa fa-trash" aria-hidden="true"></i></button></div>
        </div>
        `;

    }

    for (let i=0; i< deleteList.length; i++){
        deleteList[i].addEventListener('click',()=>{
            eliminar(i);
            calcularTotal();
        })
       
    }

}



document.addEventListener("DOMContentLoaded", () => {

    
    getJSONData(urlCart).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataCart = resultObj.data.articles;
            buyProductList.push(dataCart[0]);
            createListProducts();
            showDataCart();
        }
        


        
        calcularTotal();

        inputValues.forEach(element => {
            element.addEventListener("change", () => {
                calcularTotal();
            })
        })

        envioValues.forEach(element => {
            element.addEventListener("change", () => {
                calcularTotal();
            })
        })


        formasPago.forEach(element => {

            element.addEventListener("click", () => {

                if(element === $transferenciaBancariaCheck && $transferenciaBancariaCheck.checked){

                    $numeroCuenta.removeAttribute("disabled");
                    $numeroTarjeta.setAttribute("disabled", "");
                    $codigoSegTarj.setAttribute("disabled", "");
                    $vencimientoTarj.setAttribute("disabled", "");
                    $tipoPago.innerHTML = "Transferencia bancaria";
                    
                }
                
                if(element === $tarjCreditoCheck && $tarjCreditoCheck.checked){
                    
                    $numeroTarjeta.removeAttribute("disabled");
                    $codigoSegTarj.removeAttribute("disabled");
                    $vencimientoTarj.removeAttribute("disabled");
                    $numeroCuenta.setAttribute("disabled", "");
                    $tipoPago.innerHTML = "Tarjeta de credito";
                    
                }

            })
            
        })
        
        
    });


    $btnCompra.addEventListener("click", () => {

        let valueInputs = [];

        for (let i = 0; i < inputValues.length; i++) {
            valueInputs.push(inputValues[i].value);
            
        }
        
        if(!valueInputs.every(elem => elem > 0)){
            $productosE.removeAttribute("hidden");
            valueInputsValid = false;
        } else {
            $productosE.setAttribute("hidden", "");
            valueInputsValid = true;
        }

        if($calle.value === ""){
            $calle.classList.add("is-invalid");
            $calleE.removeAttribute("hidden");
        }
        if($numeroPuerta.value === ""){
            $numeroPuerta.classList.add("is-invalid");
            $numeroPuertaE.removeAttribute("hidden");
        }
        if($esquina.value === ""){
            $esquina.classList.add("is-invalid");
            $esquinaE.removeAttribute("hidden");
        }
        if(!$transferenciaBancariaCheck.checked && !$tarjCreditoCheck.checked){
            $tipoPagoE.removeAttribute("hidden");
        }
        if($transferenciaBancariaCheck.checked){
            if(!$numeroCuenta.value){
                $tipoPagoCamposE.removeAttribute("hidden");
            } else {
                $tipoPagoCamposE.setAttribute("hidden", "");
                pago = true;
            }
        }
        if($tarjCreditoCheck.checked){
            if($numeroTarjeta.value && $codigoSegTarj.value && $vencimientoTarj.value){
                $tipoPagoCamposE.setAttribute("hidden", "");
                pago = true;
            } else {
                $tipoPagoCamposE.removeAttribute("hidden");
            }
        }


        if($calle.value){
            $calle.classList.remove("is-invalid");
            $calleE.setAttribute("hidden", "");
        }
        if($numeroPuerta.value){
            $numeroPuerta.classList.remove("is-invalid");
            $numeroPuertaE.setAttribute("hidden", "");
        }
        if($esquina.value){
            $esquina.classList.remove("is-invalid");
            $esquinaE.setAttribute("hidden", "");
        }
        if($transferenciaBancariaCheck.checked || $tarjCreditoCheck.checked){
            $tipoPagoE.setAttribute("hidden", "");
        }



        if(valueInputsValid && $calle.value && $numeroPuerta.value && $esquina.value && (($transferenciaBancariaCheck.checked && pago) || ($tarjCreditoCheck.checked && pago))){
            $compraExitosa.removeAttribute("hidden");
        }
    })


})