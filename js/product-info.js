let log = (x) => console.log(x);

let $showProduct = document.getElementById("containerProduct");

let dataProduct = [];
let dataComments = [];

let urlProduct = PRODUCT_INFO_URL + localStorage.productID + EXT_TYPE;
let urlComments = PRODUCT_INFO_COMMENTS_URL + localStorage.productID + EXT_TYPE;


function showDataProduct(dataPro){

    $showProduct.innerHTML += `
    <div class="container">
        <h2 class="h2 my-4" >${dataPro.name}</h2>
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
        </div></p>
        <h4 class="h4 mt-5 mb-3 fw-bold " >Comentarios</h4>
    </div>
    `;
}


function showDataComments(dataComm){

    $showProduct.innerHTML += `
    <div id="showNewComment" class="d-flex flex-column-reverse" ></div>
    `
    
    for(let i = 0; i < dataComm.length; i++) {

        $showProduct.innerHTML += `
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

    $showProduct.innerHTML += `
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
    </div>
    `

}


document.addEventListener("DOMContentLoaded", () => {

    getJSONData(urlProduct).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataProduct = resultObj.data;
            showDataProduct(dataProduct);

            let $imageProduct = document.getElementById("imageProduct");

            for( let i = 0; i < dataProduct.images.length; i++){

                $imageProduct.innerHTML += `<img src="` + dataProduct.images[i] + `" alt="product image" class="col-2 img-thumbnail">`
                
            }
        }
    });

    getJSONData(urlComments).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataComments = resultObj.data;
            showDataComments(dataComments);
            showInputComments();
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
        let month = dateAndTime.getMonth();
        let day = dateAndTime.getDay();
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