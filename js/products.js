
let $showProducts = document.getElementById("showProducts");

let urlCars = "https://japceibal.github.io/emercado-api/cats_products/101.json";


function showJSON(url) {
    let json = getJSONData(urlCars)

    .then( json => {
        $showProducts.innerHTML += `<h2 class="container-fluid text-center pt-3"> Productos </h2>`;
    $showProducts.innerHTML += `<h5 class="container-fluid text-center pb-4"> Verás aquí todos los productos de la categoria ${json.data.catName} </h5>`;
    
    for(let i = 0; i < json.data.products.length; i++) {
        $showProducts.innerHTML += `
         <div class="list-group-item list-group-item-action">
             <div class="row">
                 <div class="col-3">
                     <img src="` + json.data.products[i].image + `" alt="product image" class="img-thumbnail">
                 </div>
                 <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                         <div class="mb-1">
                         <h4> ${json.data.products[i].name} - $${json.data.products[i].cost} </h4> 
                         <p> ${json.data.products[i].description} </p> 
                         </div>
                         <small class="text-muted"> ${json.data.products[i].soldCount} vendidos</small> 
                     </div>
                 </div>
             </div>
         </div>
        `;
    }
    })
}


document.addEventListener("DOMContentLoaded", function(e){
    showJSON(urlCars);
});
