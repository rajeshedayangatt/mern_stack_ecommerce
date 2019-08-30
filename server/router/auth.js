const express = require("express");
const router = express.Router();
const app = express();
var User =require("../models/User.js");
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
     	if(isMatch){
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});




//define the login list page route
router.get("/login",function(req,res) {

	  	 res.render('login', { messages: req.flash('info') });
 
});

router.get("/register",function(req,res) {

	  	 res.render('register');
 
});


router.post('/login', passport.authenticate('local',
 { successRedirect: '/admin/product', failureRedirect: '/admin/auth/login',  failureFlash: true  }));


// Endpoint to get current use
router.get('/user', function(req, res){
  res.send(req.user);
})


// Endpoint to logout
router.get('/logout', function(req, res){
  req.logout();
   res.redirect('/admin/auth/login');
});

// Register User
router.post('/register', function(req, res){
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2){
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
       res.redirect('/admin/product');
    });
  } else{
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});
module.exports = router;
