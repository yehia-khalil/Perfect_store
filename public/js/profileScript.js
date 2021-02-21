function show1(){
    if(document.getElementById("edit1").style.display=="none"){
        document.getElementById("edit1").style.display="block";
    }else{
        document.getElementById("edit1").style.display="none"
    }
}
function show2(){
    if(document.getElementById("edit2").style.display=="none"){
        document.getElementById("edit2").style.display="block";
    }else{
        document.getElementById("edit2").style.display="none"
    }
}
function show3(){
    if(document.getElementById("edit3").style.display=="none"){
        document.getElementById("edit3").style.display="block";
    }else{
        document.getElementById("edit3").style.display="none"
    }
}
function show4(){
    if(document.getElementById("edit4").style.display=="none"){
        document.getElementById("edit4").style.display="block";
    }else{
        document.getElementById("edit4").style.display="none"
    }
}

async function nameEdit(){
    console.log("in profilescript editname");
    let user ={
        newname:editedname.value,
    }
    console.log(user);
    let res = await fetch("/editname",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(user)
            })
    console.log("in fetch login 2");
    let resJson=await res.json();
    console.log("in fetch login 3");
    if(resJson.redirect){
        window.location = resJson.redirect;
    }else{
        alert("error");
    } 
}

async function phoneEdit(){
    let user ={
        newphone:editedphone.value,
    }
    console.log(user);
    let res = await fetch("/editphone",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(user)
            })
    console.log("in fetch login 2");
    let resJson=await res.json();
    console.log("in fetch login 3");
    if(resJson.redirect){
        window.location = resJson.redirect;
    }else{
        alert("error");
    } 
}

async function addressEdit(){
    let user ={
        newaddress:editedaddress.value,
    }
    console.log(user);
    let res = await fetch("/editaddress",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(user)
            })
    console.log("in fetch login 2");
    let resJson=await res.json();
    console.log("in fetch login 3");
    if(resJson.redirect){
        window.location = resJson.redirect;
    }else{
        alert("error");
    } 
}

async function mailEdit(){
    let user ={
        newmail:editedmail.value,
    }
    console.log(user);
    let res = await fetch("/editmail",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(user)
            })
    console.log("in fetch login 2");
    let resJson=await res.json();
    console.log("in fetch login 3");
    if(resJson.redirect){
        window.location = resJson.redirect;
    }else{
        alert("error");
    } 
}

// async function login(){
//     console.log("in fetch login");
//     let user ={
//         lusername:loginUserName.value,
//         lpassword:loginPassword.value
//     }
//     console.log("in fetch login 1");
//     let res = await fetch("/login",{
//         method:"POST",
//         headers:{
//             "content-type":"application/json"
//         },
//         body:JSON.stringify(user)
//     })
//     console.log("in fetch login 2");
//     let resJson=await res.json();
//     console.log("in fetch login 3");
//     if(resJson.redirect){
//         window.location = resJson.redirect;
//     }else{
//         alert("error");
//     }
// }

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