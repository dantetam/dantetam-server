var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.send('Test endpoint GET /users/login');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
