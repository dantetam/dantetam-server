var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:topic', function(req, res){
  res.render('twitter', {
    title: 'Twitter Feed',
    topic: req.params["topic"]
  });
});

module.exports = router;
