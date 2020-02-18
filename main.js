const {QueryString} = require('./index');

var query_config = {
  "count": {
    "op": "set",
    "default": 0
  },
  "setContext": {
    "op": "set",
    "func": (val) => {let arr = ["north","south"]; return arr[val]; }
  },
  "language": {
    "op": "set",
  }
};

var myQuery = new QueryString(query_config);

// Use the builder
var queryString = myQuery
      .setContext(1)
      .language("en")
      .count(100)
      .toString();