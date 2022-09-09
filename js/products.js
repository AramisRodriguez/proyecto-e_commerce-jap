let log = (x) => console.log(x);

let dataProducts = [];

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


function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "https://aramisrodriguez.github.io/proyecto-e_commerce-jap/product-info.html";
    // window.location = "product-info.html";
}


function showDataProducts(dataTitle, dataPro) {

    $showTitleProducts.innerHTML = `
    <h2 class="container-fluid text-center pt-3"> Productos </h2>
    <h5 class="container-fluid text-center pb-4"> Verás aquí todos los productos de la categoria ${dataTitle.catName} </h5>
    `;
    
    $showProducts.innerHTML = "";

    for(let i = 0; i < dataPro.length; i++) {
        $showProducts.innerHTML += `
        <div onclick="setProductID(${dataPro[i].id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + dataPro[i].image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${dataPro[i].name} - $${dataPro[i].cost} </h4>
                        <p> ${dataPro[i].description} </p>
                        </div>
                        <small class="text-muted"> ${dataPro[i].soldCount} vendidos</small>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}


function sortAndShowProducts(sortType) {

    if(sortType === "desc"){
        dataProducts.products.sort((a, b) => {
            return b.cost - a.cost;
        });
    }
    if(sortType === "asc"){
        dataProducts.products.sort((a, b) => {
            return a.cost - b.cost;
        });
    }
    if(sortType === "solds"){
        dataProducts.products.sort((a, b) => {
            return b.soldCount - a.soldCount;
        });
    }

    showDataProducts(dataProducts, dataProducts.products);

}

function filterAndShowProducts() {

    if($filterMin.value !== "" && $filterMax.value !== "") {

        let result = dataProducts.products.filter(product => product.cost > parseInt($filterMin.value) && product.cost < parseInt($filterMax.value));

        showDataProducts(dataProducts, result);
        
    }

    if($filterMin.value !== "" && $filterMax.value === "") {

        let result = dataProducts.products.filter(product => product.cost > parseInt($filterMin.value));

        showDataProducts(dataProducts, result);

    }

    if($filterMin.value === "" && $filterMax.value !== "") {

        let result = dataProducts.products.filter(product => product.cost < parseInt($filterMax.value));

        showDataProducts(dataProducts, result);

    }

}



function clearInputsFilter() {
    $filterMin.value = "";
    $filterMax.value = "";
}



document.addEventListener("DOMContentLoaded", function() {
    
    getJSONData(urlProducts).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataProducts = resultObj.data;
            showDataProducts(dataProducts, dataProducts.products);
            log(dataProducts);
        }
    });



    document.getElementById("usuario").innerHTML = sessionStorage.usuario;


    $sortDesc.addEventListener("click", function() {
        sortAndShowProducts(desc);
    })

    $sortAsc.addEventListener("click", function() {
        sortAndShowProducts(asc);
    })

    $sortSolds.addEventListener("click", function() {
        sortAndShowProducts(solds);
    })


    $filterButton.addEventListener("click", function() {
        filterAndShowProducts();
    })
    $filterClear.addEventListener("click", function() {
        clearInputsFilter();
    })

    $searchInput.addEventListener("keyup", () => {

        let result = dataProducts.products.filter( product => {
            return product.name.toLowerCase().indexOf($searchInput.value.toLowerCase()) > -1 || product.description.toLowerCase().indexOf($searchInput.value.toLowerCase()) > -1;
        })

        showDataProducts(dataProducts, result);

    })
});
