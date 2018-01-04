var request = require("request");
var auth_keys = require('./js/twitter/twitter_auth.json')

var key = auth_keys.consumer_key;
var secret = auth_keys.consumer_secret
var cat = key + ":" + secret;
var credentials = new Buffer(cat).toString('base64');

var url = 'https://api.twitter.com/oauth2/token';

request({
    url: url,
    method:'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
}, function(err, resp, body) {
    console.log(body); //the bearer token...
});
