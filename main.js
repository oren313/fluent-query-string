const {Query} = require('./index');

var twitter_qs = {
  "count": {
    "method": "set",
    "defualt": 0
  },
  "setContext": {
    "method": "set",
    "func": (val) => {let arr = ["north","south"]; return arr[val]; }
  }
};

var twitterQuery = new Query(twitter_qs);

// Use the builder
var qs = twitterQuery
      .q("#happy")
      .language("en")
      .result_type("popular")
      .count(100)
      .toString();