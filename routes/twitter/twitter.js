var express = require('express');
var router = express.Router();

var request = require("request");
var authKeys = require('./twitter_auth.json');

var twitterAnalysis = require('./twitter_analysis.js');

/*
Read API keys from the hidden file, generate a bearer token from Twitter's OAuth endpoint,
and then start another callback.
*/
function findBearerToken(res, userTopic) {
  var key = authKeys.consumer_key;
  var secret = authKeys.consumer_secret;
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
    getTweets(res, body["access_token"], userTopic);
  });
}

/*
Use the previously found bearer token to OAuth into Twitter's tweet search API,
*/
function getTweets(res, bearerToken, userTopic) {
  var url = 'https://api.twitter.com/1.1/search/tweets.json';
  request({
    url: url + "?q=" + userTopic + "&count=50&lang=en&result_type=mixed",
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + bearerToken,
      "Content-Type": "application/json"
    },
    json: true
  }, function(err, jsonResponse, body) {
    tweetStrings = parseTweets(body);
    //tweetStrings = tweetStrings.join("\n");

    wordCounts = twitterAnalysis.getWordCountFromTweets(tweetStrings);

    res.render('twitter', { //Only render the website when we are finished writing to it
      title: 'Twitter Feed',
      topic: userTopic,
      tweets: tweetStrings
    });
  });
}

function parseTweets(tweetsJson) {
  results = []
  statuses = tweetsJson["statuses"];
  for (var i = 0; i < statuses.length; i++) {
    var status = statuses[i];
    results.push(status["user"]["name"] + ": " + status["text"]);
  }
  return results;
}

/*
Use the application-only OAuth token to find popular Twitter topics
*/

function getTopics(res, bearerToken) {
  var url = 'https://api.twitter.com/1.1/trends/available.json';
  request({
    url: url,
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + bearerToken,
      "Content-Type": "application/json"
    },
    json: true
  }, function(err, jsonResponse, body) {
    topicStrings = parseTopics(body);
  });
}

function parseTopics(topicsJson) {

}

/* This callback happens when the user creates the requests
GET /twittertest/:topic
where :topic is a kind of "wildcard"
i.e. it catches /twittertest/California
 */
router.get('/:topic', function(req, res) {
  userTopic = req.params["topic"];

  findBearerToken(res, userTopic);
});

/*
Handle no topic given
*/
router.get('/', function(req, res) {
  res.render('twitter', { //Only render the website when we are finished writing to it
    title: 'Twitter Feed',
    topic: 'N/A',
    tweets: ['No tweets yet. Input a topic such as /twitter/California']
  });
});

module.exports = router;
