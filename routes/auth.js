var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt')
var Users = function() {
  return knex('users');
}

/* GET login page. */
router.get('/login', function(req, res, next) {
res.render('pages/login', {
    title: "Login"
  });
});

router.post('/login', function(req, res, next) {
	Users().where({
		email: req.body.email,
	}).first().then(function(user){
		if(user){
			//bcrypt.compareSync will hash password and compare
			if(bcrypt.compareSync(req.body.password, user.password)) {
				res.cookie('userID', user.id, { signed: true});
				res.redirect('/dashboard.ejs?userID=' + user.id);
			} else {
				res.redirect('/login.ejs?userID=Invalid Email or Password.');
			}
		} else {
			res.redirect('/signup.ejs?error=Invalid Email or Password.');
		}
	});
});

/* GET sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    title: "Sign Up"
  });
});

router.post('/signup', function(req, res, next) {
	Users().where('email', req.body.email).first().then(function(user){
		if(!user){
			var hash = bcrypt.hashSync(req.body.password, 8);
			Users().insert({
				email: req.body.email,
				password: hash
			}).then(function(id){
				res.cookie('userID', id[0], {signed: true});
				res.redirect('/dashboard.ejs?userID=' + id[0]);
			});
		} else {
			res.status(409);
			res.redirect('/login.ejs?error=You have already signed up. Please login.');
		}
	});
});


/* GET logout */
router.get('/logout', function(req, res){
  res.clearCookie('userID');
  res.redirect('/');
});


module.exports = router;
