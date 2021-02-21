async function defshirts() {
    let mainDiv = document.querySelector("#cards");
    mainDiv.innerHTML = "";
    
    let url = "/showshirts";
    let response = await fetch(url);
    let result = await response.json();
    result.forEach(element => {
        let card = document.createElement('div');
        card.classList.add("card");
        let image = document.createElement("img");
        image.src = element.test;
        image.classList.add("card-img-top");
        let body = document.createElement("div");
        body.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = element.name;

        let text = document.createElement("p");
        text.classList.add("card-text");
        text.innerHTML = "Great shirt, 100% would buy";

        let container = document.createElement("div");
        container.classList.add('container');
        container.style.cssText += "margin-top: 15px";

        let row = document.createElement("div");
        row.classList.add("row");

        let price = document.createElement("div");
        price.classList.add("col-lg-6");
        price.classList.add("col-sm-6");
        price.classList.add("col-6");
        price.style.cssText += "padding-left:0px;font-size: 14px";
        price.innerHTML = "<strong>Price: " + element.price+ " L.E</strong>";

        let quantity = document.createElement("div");
        quantity.classList.add("col-lg-6");
        quantity.classList.add("col-6");
        quantity.classList.add("col-sm-6");
        quantity.style.cssText += "text-align: end;padding-right: 0px;font-size: 14px;";
        quantity.innerHTML = "<strong>IN STOCK</strong>";

        let row2 = document.createElement("div");
        row2.classList.add("row");

        let button = document.createElement("div");
        button.classList.add("moredetails");
        button.setAttribute('id', `${element.ID}`);
        button.setAttribute('onclick', `showDetails(${element.ID})`);
        button.style.cssText += "margin-top: 10px";
        button.innerHTML = "<strong>More Details</strong>"

        row2.appendChild(button);
        row.appendChild(price);
        row.appendChild(quantity);
        container.appendChild(row);
        container.appendChild(row2);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(container);
        card.appendChild(image);
        card.appendChild(body);
        mainDiv.appendChild(card);
    });

}
async function defpants() {

    let mainDiv = document.querySelector("#cards");
    mainDiv.innerHTML = "";
    let url = "/showpants";
    let response = await fetch(url);
    let result = await response.json();
    result.forEach(element => {
        let card = document.createElement('div');
        card.classList.add("card");
        let image = document.createElement("img");
        image.src = element.test;
        image.classList.add("card-img-top");
        let body = document.createElement("div");
        body.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = element.name;

        let text = document.createElement("p");
        text.classList.add("card-text");
        text.innerHTML = "Damn son where'd you find this";

        let container = document.createElement("div");
        container.classList.add('container');
        container.style.cssText += "margin-top: 15px";

        let row = document.createElement("div");
        row.classList.add("row");

        let price = document.createElement("div");
        price.classList.add("col-lg-6");
        price.classList.add("col-sm-6");
        price.classList.add("col-6");
        price.style.cssText += "padding-left:0px;font-size: 14px";
        price.innerHTML = "<strong>Price: " + element.price+ " L.E</strong>";

        let quantity = document.createElement("div");
        quantity.classList.add("col-lg-6");
        quantity.classList.add("col-6");
        quantity.classList.add("col-sm-6");
        quantity.style.cssText += "text-align: end;padding-right: 0px;font-size: 14px;";
        quantity.innerHTML = "<strong>IN STOCK</strong>";

        let row2 = document.createElement("div");
        row2.classList.add("row");

        let button = document.createElement("div");
        button.classList.add("moredetails");
        button.setAttribute('id', `${element.ID}`);
        button.setAttribute('onclick', `showDetails(${element.ID})`);
        button.style.cssText += "margin-top: 10px";
        button.innerHTML = "<strong>More Details</strong>"

        row2.appendChild(button);
        row.appendChild(price);
        row.appendChild(quantity);
        container.appendChild(row);
        container.appendChild(row2);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(container);
        card.appendChild(image);
        card.appendChild(body);
        mainDiv.appendChild(card);
    });

}

function showShirts(){
    let button = document.querySelector("#dropdownMenuButton");
    let shirts = document.querySelector("#dropdownShirts");
    button.innerHTML = shirts.innerHTML;
    defshirts();
}


function showPants(){
    let button = document.querySelector("#dropdownMenuButton");
    let pants = document.querySelector("#dropdownPants");
    button.innerHTML = pants.innerHTML;
    defpants();
}








if ($(window).width() > 900) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#navbar_top').addClass("fixed-top  navbar-light bg-light");
            // add padding top to show content behind navbar
            $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
        } else {
            $('#navbar_top').removeClass("fixed-top ");
            // remove padding top from body
            $('body').css('padding-top', '0');
        }
    });
}

console.log("in logic.js");
async function addItem(){
    console.log("in add items");
    //let product=document.getElementById("products").value;
    //let name=document.querySelector()
    let user ={
        products:products.value,
        name:pname.value,
        price:price.value,
        quantity:qty.value,
        description:pdesc.value,
        //test:exampleFormControlFile1.value,   
    }
    console.log("in fetch regiser 1");
    let res = await fetch("/addPdts",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    console.log("in fetch register 2");
    let resJson=await res.json();
    console.log("in fetch register 3");
    if(resJson.redirect){
        window.location = resJson.redirect;
    }else{
        alert("error");
    }
}

function initMap() {
    const uluru = { lat: 31.2112585, lng: 29.948691300000004 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

async function showAll(){
    let button = document.querySelector("#dropdownMenuButton");
    let all = document.querySelector("#dropdownAll");
    button.innerHTML = "All Products";
    
    let mainDiv = document.querySelector("#cards");
    mainDiv.innerHTML = "";
    let url = "/showall";
    let response = await fetch(url);
    let result = await response.json();
    result.forEach(element => {
        let card = document.createElement('div');
        card.classList.add("card");
        let image = document.createElement("img");
        image.src = element.test;
        image.classList.add("card-img-top");
        let body = document.createElement("div");
        body.classList.add("card-body");

        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = element.name;

        let text = document.createElement("p");
        text.classList.add("card-text");
        text.innerHTML = "Great buy, definetly recommend it";

        let container = document.createElement("div");
        container.classList.add('container');
        container.style.cssText += "margin-top: 15px";

        let row = document.createElement("div");
        row.classList.add("row");

        let price = document.createElement("div");
        price.classList.add("col-lg-6");
        price.classList.add("col-sm-6");
        price.classList.add("col-6");
        price.style.cssText += "padding-left:0px;font-size: 14px";
        price.innerHTML = "<strong>Price: " + element.price+ " L.E</strong>";

        let quantity = document.createElement("div");
        quantity.classList.add("col-lg-6");
        quantity.classList.add("col-6");
        quantity.classList.add("col-sm-6");
        quantity.style.cssText += "text-align: end;padding-right: 0px;font-size: 14px;";
        quantity.innerHTML = "<strong>IN STOCK</strong>";

        let row2 = document.createElement("div");
        row2.classList.add("row");

        let button = document.createElement("div");
        button.classList.add("moredetails");
        button.setAttribute('id', `${element.ID}`);
        button.setAttribute('onclick', `showDetails(${element.ID})`);
        button.style.cssText += "margin-top: 10px";
        button.innerHTML = "<strong>More Details</strong>"

        row2.appendChild(button);
        row.appendChild(price);
        row.appendChild(quantity);
        container.appendChild(row);
        container.appendChild(row2);
        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(container);
        card.appendChild(image);
        card.appendChild(body);
        mainDiv.appendChild(card);
    });
}

async function showDetails(sentId) {
    // let url = "/fullproduct";
    // let sentbody = { 
    //     id: sentId 
    // };
    // let options = {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(sentbody),
    // }
    // let response = await fetch(url, options);
    // let result = await response.json();

    let sentbody ={
        id: sentId 
    }
    console.log("in fetch desc 1");
    let res = await fetch("/fullproduct",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(sentbody)
    })
    console.log("in fetch desc 2");

    let resJson=await res.json();
    console.log("in fetch desc 3");
    if(resJson.redirect){
        window.location = resJson.redirect;
    }else{
        alert("error");
    }
}

async function addToCart(){
    console.log("in add to cart");
    let product ={
        name: productName.innerText,
        price: productPrice.innerText, 
        date: new Date(),
    }
    console.log("in fetch desc 1");
    let res = await fetch("/addToCart",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(product)
    })
    console.log("in fetch desc 2");

    let resJson=await res.json();
    console.log("in fetch desc 3");
    if(resJson.success){
        console.log("added successfully to cart");
    }else{
        console.log("error");
    }
}

function submitPurcaseOrder(){
    window.location="/submitToAdmin";
}