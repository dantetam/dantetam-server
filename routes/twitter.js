var express = require('express');
var router = express.Router();

var request = require("request");
var auth_keys = require('./twitter_auth.json');

function findBearerToken(res, topic) {
  var key = auth_keys.consumer_key;
  var secret = auth_keys.consumer_secret;
  var cat = key + ":" + secret;
  var credentials = new Buffer(cat).toString('base64');

  var url = 'https://api.twitter.com/oauth2/token';

  request({
    url: url,
    method: 'POST',
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    json: true,
    body: "grant_type=client_credentials"
  }, function(err, resp, body) {
    //console.log(body["access_token"]);
    getTweets(body["access_token"], topic);
  });
}

function getTweets(bearerToken, topic) {
  var url = 'https://api.twitter.com/1.1/search/tweets.json';
  console.log(">>>Bearer " + bearerToken + '<<<');
  request({
    url: url + "?q=" + topic,
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + bearerToken,
      "Content-Type": "application/json"
    },
    json: true
  }, function(err, resp, body) {
    console.log("Done");
    parseTweets(body);
  });
}

function parseTweets(tweetsJson) {
  results = []
  console.log(tweetsJson["statuses"]);
  for (var i = 0; i < statuses.length; i++) {
    var status = statuses[i];
    results.push(status["user"]["name"] + ": " + status["text"]);
  }
  console.log(results[0]);
}

/* GET home page. */
router.get('/:topic', function(req, res) {
  userTopic = req.params["topic"];
  res.render('twitter', {
    title: 'Twitter Feed',
    topic: userTopic
  });

  findBearerToken(res, userTopic);

});

module.exports = router;
