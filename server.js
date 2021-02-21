let express = require("express");
let bodyParser = require("body-parser");
var fs = require("fs");
var session = require("express-session");
const { compose } = require("async");
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');

var app = express();

app.set("view engine", "ejs");
urlParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();
app.use(session({ resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 6000000 } }));//setting sessions

app.use("/public", express.static(__dirname + "/public"));

//solving back issue 
app.use(function (req, res, next) { res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); next(); });

let itemName="";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, itemsID + path.extname(file.originalname));
        itemName=itemsID + path.extname(file.originalname);
    }
});

let users = [];
let pants = [];
let shirts = [];
let pantsAndShirts = [];
let itemsID = 1;
let usersID = 1;
let descobj = {};
let viewOrders = [];


function saveData() {

    fs.writeFile("dbfiles/userfile.json", JSON.stringify(users), function (err) {

    })
}

function readData() {
    fs.readFile("dbfiles/userfile.json", function (err, data) {
        if (data) {
            console.log("read file success");

            users = JSON.parse(data);
        }
    })
    fs.readFile("dbfiles/pants.json", function (error, data) {
        if (data) {
            console.log("read file success");

            pants = JSON.parse(data);
        }
    })

    fs.readFile("dbfiles/shirts.json", function (error, data) {
        if (data) {
            console.log("read file success");

            shirts = JSON.parse(data);
        }
    })

    fs.readFile("dbfiles/pantsandshirts.json", function (error, data) {
        if (data) {
            console.log("read file success");

            pantsAndShirts = JSON.parse(data);
        }
    })

    fs.readFile("dbfiles/itemsIdNumeber.json", function (error, data) {
        if (data) {
            console.log("read file success");

            itemsID = JSON.parse(data);
        }
    })

    fs.readFile("dbfiles/usersIdNumber.json", function (error, data) {
        if (data) {
            console.log("read file success");

            itemsID = JSON.parse(data);
        }
    })


    fs.readFile("dbfiles/allPurchaseOrders.json", function (error, data) {
        if (data) {
            console.log("read file success");
            viewOrders = JSON.parse(data);
        }
    })
    
}

readData();

app.post('/upload-item-pic', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('item_pic');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.redirect("/addproducts");
        // Display uploaded image for user validation
        //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});

//adding products to array and files
app.post("/addPdts", jsonParser, function (req, res) {

    //let corrected = req.body.test.split("\\");
    //req.body.test = "/public/img/" + corrected[corrected.length - 1];

    //adding ID and making like autoincremented
    req.body.ID = itemsID;
    req.body.test ="/public/img/" + itemName;
    console.log(itemName);
    console.log(req.body.test);
    console.log("in addPDTS seeing item name");
    itemsID++;

    fs.writeFile("dbfiles/itemsIdNumeber.json", JSON.stringify(itemsID), function (err) {
        console.log(err);
    })


    pantsAndShirts.push(req.body);
    fs.writeFile("dbfiles/pantsandshirts.json", JSON.stringify(pantsAndShirts), function (error) {
        console.log(error);
    })

    if (req.body.products == "shirts") {
        shirts.push(req.body);
        console.log("added to shirts");
        fs.writeFile("dbfiles/shirts.json", JSON.stringify(shirts), function (error) {
            console.log(error);
        })
    }
    else {
        pants.push(req.body);
        console.log("added to pants");
        fs.writeFile("dbfiles/pants.json", JSON.stringify(pants), function (error) {
            console.log(error);
        })
    }

    res.send({ redirect: '/adminPicAdd' });
})

app.get("/adminPicAdd", function (req, res) {
    if (req.session.myid == 0) {
        console.log("in add pic products");
        res.render("pages/adminAddPic.ejs");
    } else {
        res.redirect('/home');
    }
});

//homepage
app.get("/home", function (req, res) {
    if (req.session.myid) {
        if (req.session.myid == 0) {
            console.log("in home admin");
            res.render("pages/home.ejs", { name: req.session.myName });
        } else {
            console.log("in home customer");
            let x = req.session.myid;
            res.render("pages/home.ejs", { name: req.session.myName });
        }
    } else {
        console.log("in home visitor");
        res.render("pages/home.ejs", { name: "" });
    }
});

//adding user to array and file
app.post("/api/users/add", jsonParser, function (req, res) {
    console.log("in add users in server");
    if(users.findIndex(y => y.username == req.body.username)== -1){
        //adding user ID
        console.log("user is being added");
        req.body.ID = usersID;
        usersID++;
        fs.writeFile("dbfiles/usersIdNumber.json", JSON.stringify(usersID), function (err) {
            console.log(err);
        })

        users.push(req.body);
        res.send({ success: 'success' });
        console.log("in adding user api");
        saveData();
    }else{
        console.log("in register user is used");
        res.send({ error1: 'username is already used' });
    }
})

//login
app.post("/login", jsonParser, function (req, res) {
    console.log("in server login ");
    if (req.body.lusername == 'admin' && req.body.lpassword == 'admin') {
        req.session.myName = 'admin';
        req.session.myid = '0';
        res.send({ redirect: '/home' });
        console.log("in admin if");
    } else {
        console.log("in not admin if");
        let user = users.find(q => q.username == req.body.lusername && q.password == req.body.lpassword);
        console.log(user);
        if (user) {
            req.session.myid = user.ID;
            req.session.myName = user.username;
            res.send({ redirect: '/home' });
        } else {
            res.send({ error: 'user not found' });
        }
    }
})

//logout
app.get("/logout", function (req, res) {
    console.log("in logout server");
    req.session.destroy(function (err) {
        console.log("error in destroying session");
    })
    res.redirect('/home');
})

//products page
app.get("/products", function (req, res) {
    if (req.session.myid) {
        if (req.session.myid == 0) {
            console.log("in products admin");
            res.render("pages/products.ejs", { name: req.session.myName });
        } else {
            console.log("id found in server and is " + req.session.myid);
            let x = req.session.myid;
            console.log(x);
            res.render("pages/products.ejs", { name: req.session.myName });
        }
    } else {
        console.log("in else");
        res.redirect('/home');
    }
})


//profile
app.get("/profile", function (req, res) {
    if (req.session.myid) {
        let user = users.find(q => q.ID == req.session.myid);
        console.log("in profile in server");
        res.render("pages/profile.ejs", {
            name: user.username,
            email: user.mail,
            address: user.address,
            phone: user.phone,
        });
    } else {
        res.redirect('/home');
    }
});

//getting product for page that displays more info about product
app.post("/fullproduct", jsonParser, function (req, res) {
    console.log("in desc post login 1");
    if (req.session.myid >= 0) {
        let item = pantsAndShirts.find(q => q.ID == req.body.id);
        console.log(item);
        descobj = {
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.test,
        };
        res.send({ redirect: '/productdesc' });
    } else {
        res.redirect('/home');
    }
})

//displaying page that displays more info about product
app.get("/productdesc", function (req, res) {
    console.log(descobj);
    if (req.session.myid == 0) {
        res.render("pages/productDesc.ejs", {
            prodname: descobj.name,
            description: descobj.description,
            price: descobj.price,
            image: descobj.image,
            name: 'admin'
        })
    } else {
        if (req.session.myid > 0) {
            res.render("pages/productDesc.ejs", {
                prodname: descobj.name,
                description: descobj.description,
                price: descobj.price,
                image: descobj.image,
                name: req.session.myName,
            })
        } else {

            console.log("in else");
            res.redirect("/home");
        }
    }
});



app.post("/editname", jsonParser, function (req, res) {
    console.log("in server edit name");
    if (req.session.myid) {
        let inde = users.findIndex(y => y.ID === req.session.myid);
        users[inde].username = req.body.newname;
        saveData();
        res.send({ redirect: '/profile' });
    } else {
        res.send({ error: 'user not found' });
        res.redirect('/home');
    }
});

app.post("/editphone", jsonParser, function (req, res) {
    if (req.session.myid) {
        let inde = users.findIndex(y => y.ID === req.session.myid);
        users[inde].phone = req.body.newphone;
        saveData();
        res.send({ redirect: '/profile' });
    } else {
        res.send({ error: 'user not found' });
        res.redirect('/home');
    }
});

app.post("/editaddress", jsonParser, function (req, res) {
    if (req.session.myid) {
        let inde = users.findIndex(y => y.ID === req.session.myid);
        users[inde].address = req.body.newaddress;
        saveData();
        res.send({ redirect: '/profile' });
    } else {
        res.send({ error: 'user not found' });
        res.redirect('/home');
    }
});

app.post("/editmail", jsonParser, function (req, res) {
    if (req.session.myid) {
        let inde = users.findIndex(y => y.ID === req.session.myid);
        users[inde].mail = req.body.newmail;
        saveData();
        res.send({ redirect: '/profile' });
    } else {
        res.send({ error: 'user not found' });
        res.redirect('/home');
    }
});

app.get("/addproducts", function (req, res) {
    if (req.session.myid == 0) {
        console.log("in add products");
        res.render("pages/adminadd.ejs");
    } else {
        res.redirect('/home');
    }
});

app.get("/showpants", function (req, res) {
    console.log("show pants");
    res.send(JSON.stringify(pants));
});
app.get("/showshirts", function (req, res) {
    res.send(JSON.stringify(shirts));
});

app.get("/showall", function (req, res) {
    res.send(JSON.stringify(pantsAndShirts));
});


app.get("/findus", function (req, res) {

    if (req.session.myid) {
        if (req.session.myid == 0) {
            console.log("in home admin");
            res.render("pages/findus.ejs", { name: req.session.myName });
        } else {
            console.log("id found in server and is " + req.session.myid);
            let x = req.session.myid;
            console.log(x);
            res.render("pages/findus.ejs", { name: req.session.myName });
        }
    } else {
        console.log("in else");
        res.render("pages/findus.ejs", { name: "" });
    }
});

app.get("/aboutus", function (req, res) {

    if (req.session.myid) {
        if (req.session.myid == 0) {
            console.log("in home admin");
            res.render("pages/aboutus.ejs", { name: req.session.myName });
        } else {
            console.log("id found in server and is " + req.session.myid);
            let x = req.session.myid;
            console.log(x);
            res.render("pages/aboutus.ejs", { name: req.session.myName });
        }
    } else {
        console.log("in else");
        res.render("pages/aboutus.ejs", { name: "" });
    }
});

app.post("/addToCart", jsonParser, function (req, res) {
    console.log("in add to cart in server");
    console.log(req.body);
    if (req.session.cart) {
        req.session.cart.push(req.body);
    } else {
        req.session.cart = [];
        req.session.cart.push(req.body);
    }
    console.log("after adding");
    console.log(req.session.cart);
    res.send({ success: 'success' });
    console.log("in server");
})

app.get("/cart", function (req, res) {

    if (req.session.myid > 0) {
        if (req.session.cart) {
            console.log("id found in server in cart and is " + req.session.myid);
            res.render("pages/cart.ejs", { items: req.session.cart, name: req.session.myName });
        } else {
            res.render("pages/cart.ejs", { items: [], name: req.session.myName });
        }
    } else {
        res.redirect('/home');
    }
});

app.get("/submitToAdmin", function (req, res) {

    if (req.session.myid > 0) {
        if (req.session.cart) {
            viewOrders.push(req.session.cart);
            console.log("write in orders");
            fs.writeFile("dbfiles/allPurchaseOrders.json", JSON.stringify(viewOrders), function (error) {
                console.log(error);
            })
            req.session.cart = [];

            res.redirect("/home");
        } else {
            res.redirect("/home");
        }
    } else {
        res.redirect('/home');
    }

});

app.get("/allPorders", function (req, res) {

    if (req.session.myid == 0) {
        console.log("in all products server");
        res.render("pages/purchaseOrder.ejs", { items: viewOrders });
        console.log("in all products server 1");
    } else {
        console.log("in all products server 2");
        res.redirect('/home');
    }

});


app.listen(8080);
