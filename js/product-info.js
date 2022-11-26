let log = (x) => console.log(x);

let $showProduct = document.getElementById("containerProduct");
let $showComments = document.getElementById("containerComments");

let dataProduct = [];
let dataComments = [];
let buyProductList = [];

let urlProduct = PRODUCT_INFO_URL + localStorage.productID + EXT_TYPE;
let urlComments = PRODUCT_INFO_COMMENTS_URL + localStorage.productID + EXT_TYPE;

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "https://aramisrodriguez.github.io/proyecto-e_commerce-jap/product-info.html";
    // window.location = "product-info.html";
}



function buyProduct(){
  
    if(localStorage.getItem("buyProductList")){
        buyProductList = JSON.parse(localStorage.getItem("buyProductList"));
        buyProductList.push({image: dataProduct.images[0], name: dataProduct.name, currency: dataProduct.currency, unitCost: dataProduct.cost, id: dataProduct.id});


        let obj = {};
        buyProductList = buyProductList.filter(function(current) {
        let exists = !obj[current.id];
        obj[current.id] = true;
        return exists;
        });


        localStorage.setItem("buyProductList", JSON.stringify(buyProductList));
    }

    if(localStorage.getItem("buyProductList") === null){
        buyProductList.push({image: dataProduct.images[0], name: dataProduct.name, currency: dataProduct.currency, unitCost: dataProduct.cost, id: dataProduct.id});
        localStorage.setItem("buyProductList", JSON.stringify(buyProductList));
    }  

}


function showDataProduct(dataPro){

    $showProduct.innerHTML += `
    <div class="container mt-5">
        <div class="container d-flex justify-content-between align-items-center" >
            <h2 class="h2 my-4" >${dataPro.name}</h2>
            <div class="mx-5" ><button onclick ="buyProduct()" type="button" class="btn btn-success" id="comprar">Comprar</button></div>
            </div>
        <hr/>
        <p><span class="fw-bold" >Precio</span></br>
        ${dataPro.currency} ${dataPro.cost} </p>
        <p><span class="fw-bold" >Descripción</span></br>
        ${dataPro.description}</p>
        <p><span class="fw-bold" >Categoría</span></br>
        ${dataPro.category}</p>
        <p><span class="fw-bold" >Cantidad de vendidos</span></br>
        ${dataPro.soldCount}</p>
        <p><span class="fw-bold" >Imágenes ilustrativas</span></br>
        <div id="imageProduct" class="d-flex gap-3" >
        </div>
        </p>
        <h4 class="h4 mt-5 mb-3 fw-bold " >Comentarios</h4>
    </div>
    `;
}


function showDataComments(dataComm){

    $showComments.innerHTML += `
    <div id="showNewComment" class="d-flex flex-column-reverse" ></div>
    `
    
    for(let i = 0; i < dataComm.length; i++) {

        $showComments.innerHTML += `
        <div class="container border p-3">
            <div class="">
                <div class="">
                    <span class="fw-bold" >${dataComm[i].user}</span>
                    <span>-${dataComm[i].dateTime}-</span>
                    <span>
                    <span class="fa fa-star  ${dataComm[i].score >= 1 ? "checked" : ""}"></span>
                    <span class="fa fa-star  ${dataComm[i].score >= 2 ? "checked" : ""}"></span>
                    <span class="fa fa-star  ${dataComm[i].score >= 3 ? "checked" : ""}"></span>
                    <span class="fa fa-star  ${dataComm[i].score >= 4 ? "checked" : ""}"></span>
                    <span class="fa fa-star  ${dataComm[i].score >= 5 ? "checked" : ""}"></span>
                    </span>
                </div>
                <div class="">
                    <span>${dataComm[i].description}</span>
                </div>
            </div>
        </div>
        `;

    }

}

function showInputComments(){

    $showComments.innerHTML += `
    <div class="container">
        <h4 class="h4 mt-5 fw-bold" >Comentar</h4>
        <div class="" >
            <span class="row p-2" >Tu opinión:</span>
            <textarea id="inputComment" class="row" name="comentario" rows="4" cols="60" placeholder="Escribe aquí tus comentarios." ></textarea>
        </div>
        <div class="mt-3" >
            <span class="me-2" >Tu puntuación:</span>
            <span id="star1" class="fa fa-star" style="cursor:pointer" ></span>
            <span id="star2" class="fa fa-star" style="cursor:pointer" ></span>
            <span id="star3" class="fa fa-star" style="cursor:pointer" ></span>
            <span id="star4" class="fa fa-star" style="cursor:pointer" ></span>
            <span id="star5" class="fa fa-star" style="cursor:pointer" ></span>
            <button id="showCommentBtn" class="btn btn-primary ms-4" >Enviar</button>
        </div>
        <hr class="m-5"/>
        <div class="" id="relatedProducts">
            <h4 class="h4 mb-4 fw-bold" >Productos relacionados</h4>
        </div>
        </div>
    `

}

function carousel(id, data){

    id.innerHTML += `
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="` + data.images[0] + `" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="` + data.images[1] + `" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="` + data.images[2] + `" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="` + data.images[3] + `" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
    `   

}


document.addEventListener("DOMContentLoaded", () => {

    getJSONData(urlProduct).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataProduct = resultObj.data;
            showDataProduct(dataProduct);
            log(dataProduct)

            let $imageProduct = document.getElementById("imageProduct");

            carousel($imageProduct, dataProduct);

        }
    });

    getJSONData(urlComments).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataComments = resultObj.data;
            showDataComments(dataComments);
            showInputComments();

            let $relatedProducts = document.getElementById("relatedProducts");


            for( let i = 0; i < dataProduct.relatedProducts.length; i++){

                $relatedProducts.innerHTML += `
                <div onclick="setProductID(${dataProduct.relatedProducts[i].id})" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + dataProduct.relatedProducts[i].image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4> ${dataProduct.relatedProducts[i].name}</h4>
                        </div>
                    </div>
                </div>
            </div>
                `
                
            }
        }

        let $star1 = document.getElementById("star1");
        let $star2 = document.getElementById("star2");
        let $star3 = document.getElementById("star3");
        let $star4 = document.getElementById("star4");
        let $star5 = document.getElementById("star5");

        let stars = [$star1, $star2, $star3, $star4, $star5];
        let starScore;

        stars.forEach(star => {
            star.addEventListener("click", () => {
                if(star === $star1){
                    stars.forEach(star => star.classList.remove("checked"));
                    $star1.classList.add("checked");
                    return starScore = 1;
                }
                if(star === $star2){
                    stars.forEach(star => star.classList.remove("checked"));
                    $star1.classList.add("checked");
                    $star2.classList.add("checked");
                    return starScore = 2;
                }
                if(star === $star3){
                    stars.forEach(star => star.classList.add("checked"));
                    $star4.classList.remove("checked");
                    $star5.classList.remove("checked");
                    return starScore = 3;
                }
                if(star === $star4){
                    stars.forEach(star => star.classList.add("checked"));
                    $star5.classList.remove("checked");
                    return starScore = 4;
                }
                if(star === $star5){
                    stars.forEach(star => star.classList.add("checked"));
                    return starScore = 5;
                }
            })
        })


        let $inputComment = document.getElementById("inputComment");
        let $showCommentBtn = document.getElementById("showCommentBtn");
        let $showNewComment = document.getElementById("showNewComment");

        let dateAndTime = new Date();
        let year = dateAndTime.getFullYear();
        let month = dateAndTime.getMonth() + 1;
        let day = dateAndTime.getDate();
        let hours = dateAndTime.getHours();
        let minutes = dateAndTime.getMinutes();
        let seconds = dateAndTime.getSeconds();

        if(month < 10) { month = "0" + month; }
        if(day < 10) { day = "0" + day; }
        if(hours < 10) { hours = "0" + hours; }
        if(minutes < 10) { minutes = "0" + minutes; }
        if(seconds < 10) { seconds = "0" + seconds; }

        let dateTimeCurrent = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;


        $showCommentBtn.addEventListener("click", () => {
        
            $showNewComment.innerHTML += `
            <div class="container border p-3">
                <div class="">
                    <div class="">
                        <span class="fw-bold" >${sessionStorage.usuario}</span>
                        <span>-${dateTimeCurrent}-</span>
                        <span>
                        <span class="fa fa-star ${starScore >= 1 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${starScore >= 2 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${starScore >= 3 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${starScore >= 4 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${starScore >= 5 ? "checked" : ""}"></span>
                        </span>
                    </div>
                    <div class="">
                        <span>${$inputComment.value}</span>
                    </div>
                </div>
            </div>
            `;

    })

    });

})