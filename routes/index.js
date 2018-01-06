var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {});
});

router.get('/projects', function(req, res){
  res.render('projects', {});
});

router.get('/design', function(req, res){
  res.render('design', {});
});

router.get('/education', function(req, res){
  res.render('education', {});
});

router.get('/resume', function(req, res){
  res.render('resume', {});
});

router.get('/experiments', function(req, res){
  res.render('experiments', {});
});

router.get('/literature', function(req, res){
  res.render('literature', {});
});

module.exports = router;
