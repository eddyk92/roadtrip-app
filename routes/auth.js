var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('pages/login', {
    title: "Login"
  });
});

router.post('/login', function(req, res, next) {
  //  Store userID in cookie
});

/* GET sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    title: "Sign Up"
  });
});

router.post('/signup', function(req, res, next) {
  //  Store userID in cookie
});


/* GET logout */
router.get('/logout', function(req, res){
  res.clearCookie('userID');
  res.redirect('/');
});


module.exports = router;
