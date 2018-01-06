var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {});
});

/* All of these pages are within the portfolio folder,
which represents quick displays of my work. */
router.get('/projects', function(req, res){
  res.render('portfolio/projects', {});
});

router.get('/design', function(req, res){
  res.render('portfolio/design', {});
});

router.get('/education', function(req, res){
  res.render('portfolio/education', {});
});

router.get('/resume', function(req, res){
  res.render('resume', {});
});

router.get('/experiments', function(req, res){
  res.render('portfolio/experiments', {});
});

router.get('/literature', function(req, res){
  res.render('portfolio/literature', {});
});

module.exports = router;
