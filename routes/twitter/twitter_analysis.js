module.exports = {

  foo: function (a,b) {
    return a + b;
  },

  /*
  Takes in a string tweet, which may contain bad characters/misformed words,
  and returns a lower case version, in an array of tokens.
  */
  sanitizeTweet: function(tweet) {
    var tokens = tweet.toLowerCase().split(/[ ,]+/);
    //Go backwards since we are removing elements, arraylist trap
    for (var i = tokens.length - 1; i >= 0; i--) {
      var token = tokens[i];
      if (token.contains("...") || token.contains("https://") || token.length == 0) {
        tokens.splice(i, 1);
      }
    }
    return tokens;
  },

  /*
  Takes in an array of tweets, and returns an array of an array of tokens
  */
  sanitizeTweets: function(tweetsArr) {

  },

  /*
  Takes in an array of an array of tokens, and returns a word count dictionary
  */
  wordCount: function(doubleArrTokens) {

  }

};
