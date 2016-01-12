var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Roadtripper' });
});

/*  GET dashboard  */
router.get('/dashboard', isLoggedIn, function(req, res, next) {
  res.render('pages/dashboard', {
    title: 'Dashboard',
    browser_key: process.env.BROWSER_KEY
  });
});

module.exports = router;


/*  Middleware to check if user is logged in  */
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/auth/signup');
}
