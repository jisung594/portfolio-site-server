var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/about', function(req, res, next) {
  // res.render('about', {
  //   title: "Hi, I'm Jonathan."
  // });
  res.send('about')
});

module.exports = router;
