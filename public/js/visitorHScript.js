console.log("in register.js");
async function addUser(){
    console.log("in fetch");
    let user ={
        mail:registerEmail.value,
        password:registerPassword.value,
        username:registerUserName.value,
        address:registerAddress.value,
        city:registerCity.value,
        zipcode:registerZip.value,
        phone:registerPhoneNumber.value,
        // Uname:namee.value,
        // Upass:pass.value
    }
    console.log("in fetch regiser 1");
    let res = await fetch("/api/users/add",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    console.log("in fetch register 2");
    let resJson=await res.json();
    console.log("in fetch register 3");
    if(resJson.success){
        alert("registeration success")
        //alert("Registeration successful");
    }else{
        alert(resJson.error1);
    }
}

console.log("in login.js");
async function login(){
    console.log("in fetch login");
    let user ={
        lusername:loginUserName.value,
        lpassword:loginPassword.value
    }
    console.log("in fetch login 1");
    let res = await fetch("/login",{
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

function showErrorMsg(){
    document.getElementById("errMsg").style.display="block";
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

function hideErrorMsg(){
    document.getElementById("errMsg").style.display="none";
}