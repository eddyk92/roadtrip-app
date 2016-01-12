var express = require('express');
var router = express.Router();
var passport = require('passport');
require('locus');

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('pages/login', {
    title: "Login",
    message: req.flash('message')
  });
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash : true
}));

/* GET sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    title: "Sign Up",
    message: req.flash('message')
  });
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/signup',
  failureFlash : true
}));


/* GET logout */
router.get('/logout', function(req, res){
  // res.clearCookie('userID');
  req.logout();
  res.redirect('/');
});


module.exports = router;
