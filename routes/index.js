var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    name: "Jonathan Choi",
    title: "Jon's first Express app",
    age: "25"
  });
});

module.exports = router;
