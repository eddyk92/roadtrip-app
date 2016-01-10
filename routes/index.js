var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Roadtripper' });
});

/*  GET dashboard  */
router.get('/dashboard', function(req, res, next) {
  res.render('pages/dashboard', { title: 'Roadtripper' });
});

module.exports = router;
