const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash=require("connect-flash");
var cors = require('cors');


var bodyParser = require('body-parser')

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use(cookieParser());
app.use(express.json());
// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
          cookie: {

            path: "/",

       maxAge:  3600000  //30 mins

        }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//static file using

app.use('/static', express.static(path.join(__dirname, 'server/uploads')))
app.use('/static', express.static(path.join(__dirname, 'public')))


app.set('view engine', 'pug')
app.set('views', './server/views')
// DB config
// const db = require("./config/key");

//connect to mongo
mongoose.connect("mongodb://root:root123@ds117681.mlab.com:17681/shopify",{
  useNewUrlParser : true,
  useCreateIndex :true
}).then(() => {
            console.log("Mongo db connected");
        })
        .catch(err => console.log(err));

app.get("/admin/",(req,res) => {

	if (req.user) {
        next();
    } else {
  		res.render('login')
    }


});


//All Routers
var product = require("./server/router/product");
var category = require("./server/router/category");
var subcategory = require("./server/router/subcategory");
var auth = require("./server/router/auth");
var api = require("./server/router/api");
var cart = require("./server/router/cart");
var order = require("./server/router/order");

app.use("/admin/product",product);
app.use("/admin/category",category);
app.use("/admin/subcategory",subcategory);
app.use("/admin/auth",auth);
app.use("/api",api);
app.use("/api",cart);
app.use("/api",order);


// Serve static assets if in production 
if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  app.get("*",(req,res) => {

    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    
  });
}


const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`server started on port ${port}`));