let log = (x) => console.log(x);

let $sortDesc = document.getElementById("sortDescPrice");
let $sortAsc = document.getElementById("sortAscPrice");
let $sortSolds = document.getElementById("sortBySolds");
let desc = "desc";
let asc = "asc";
let solds = "solds";
let $filterMin = document.getElementById("rangeFilterMin");
let $filterMax = document.getElementById("rangeFilterMax");
let $filterButton = document.getElementById("rangeFilterButton");
let $filterClear = document.getElementById("clearRangeFilter");
let $searchInput = document.getElementById("searchInput");


let $showTitleProducts = document.getElementById("showTitleProducts");
let $showProducts = document.getElementById("showProducts");


let urlProducts = PRODUCTS_URL + localStorage.catID + EXT_TYPE;


let dataJSONProducts = getJSONData(urlProducts).then(json => json.data);

// dataJSONProducts.then(json => log(json.products));


function showArray(arr) {

    $showProducts.innerHTML = "";

    for(let i = 0; i < arr.length; i++) {
        $showProducts.innerHTML += `
         <div class="list-group-item list-group-item-action">
             <div class="row">
                 <div class="col-3">
                     <img src="` + arr[i].image + `" alt="product image" class="img-thumbnail">
                 </div>
                 <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                         <div class="mb-1">
                         <h4> ${arr[i].name} - $${arr[i].cost} </h4>
                         <p> ${arr[i].description} </p>
                         </div>
                         <small class="text-muted"> ${arr[i].soldCount} vendidos</small>
                     </div>
                 </div>
             </div>
         </div>
        `;
    }

}

function showJSONTitleProducts(dataJSON) {

    dataJSON.then(json => {
        $showTitleProducts.innerHTML += `<h2 class="container-fluid text-center pt-3"> Productos </h2>`;
        $showTitleProducts.innerHTML += `<h5 class="container-fluid text-center pb-4"> Verás aquí todos los productos de la categoria ${json.catName} </h5>`;
    })
}


function showJSONProducts(dataJSON) {
    
    dataJSON.then(json => { 

    showArray(json.products);
    
    })
}


function sortAndShowProducts(dataJSON, sortType) {

    dataJSON.then(json => {

    if(sortType === "desc"){
        json.products.sort((a, b) => {
            return b.cost - a.cost;
        });
    }
    if(sortType === "asc"){
        json.products.sort((a, b) => {
            return a.cost - b.cost;
        });
    }
    if(sortType === "solds"){
        json.products.sort((a, b) => {
            return b.soldCount - a.soldCount;
        });
    }

    showArray(json.products);

    })

}

function filterAndShowProducts(dataJSON) {

    if($filterMin.value !== "" && $filterMax.value !== "") {
        dataJSON.then(json => {

            let result = json.products.filter(product => product.cost > $filterMin.value && product.cost < $filterMax.value);
    
            showArray(result);
        })
    }

}



function clearInputsFilter() {
    $filterMin.value = "";
    $filterMax.value = "";
    showJSONProducts(dataJSONProducts);
}


document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("usuario").innerHTML = sessionStorage.usuario;


    showJSONTitleProducts(dataJSONProducts);
    showJSONProducts(dataJSONProducts);



    $sortDesc.addEventListener("click", function() {
        sortAndShowProducts(dataJSONProducts, desc);
    })

    $sortAsc.addEventListener("click", function() {
        sortAndShowProducts(dataJSONProducts, asc);
    })

    $sortSolds.addEventListener("click", function() {
        sortAndShowProducts(dataJSONProducts, solds);
    })


    $filterButton.addEventListener("click", function() {
        filterAndShowProducts(dataJSONProducts);
    })
    $filterClear.addEventListener("click", function() {
        clearInputsFilter();
    })

    $searchInput.addEventListener("keyup", () => {

        dataJSONProducts.then(json => {

            let result = json.products.filter( product => {
                return product.name.toLowerCase().indexOf($searchInput.value.toLowerCase()) > -1 || product.description.toLowerCase().indexOf($searchInput.value.toLowerCase()) > -1;
            })

            showArray(result);
        })

    })
});
