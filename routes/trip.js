var express = require('express');
var router = express.Router();
require('locus')

/*  GET trip page
    id of trip, get from table, then render page
  */
router.get('/:id', function(req, res, next) {
  res.render('pages/trip', {
    title: 'Roadtripper',
    browser_key: process.env.BROWSER_KEY
  });
});

/*  POST /trip/new
    add to database
    redirect to trip page/id ***change :id to the actual id in table
*/

router.post('/new', function(req, res, next) {
  res.redirect('/trip/' + id);
});

module.exports = router;