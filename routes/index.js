var express = require('express');
var router = express.Router();
var fs = require('fs');

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
  //From https://stackoverflow.com/questions/11598274/display-pdf-in-browser-using-express-js
  var stream = fs.createReadStream('./public/materials/Dante_Tam_Jan_2018_Resume.pdf');
  var filename = "Dante_Tam_Jan_2018_Resume.pdf";
  filename = encodeURIComponent(filename);
  res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  stream.pipe(res);
});

router.get('/experiments', function(req, res){
  res.render('portfolio/experiments', {});
});

router.get('/literature', function(req, res){
  res.render('portfolio/literature', {});
});

module.exports = router;
