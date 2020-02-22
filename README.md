# fluent-query-string

  Create a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface) fluent query string.

## Installation
```bash
    $ npm install fluent-query-string
```

## Example
```js
var fluentQueryString = require('fluent-query-string');

var query_config = {
  "partOfTheWorld": {
      "op": "set",
      "func": (val) => {let arr = ["north","south","east","west"]; return arr[val]; }
  },
  "language": {
    "op": "add",
    "default": "en",
  },
  "count": {
    "op": "set"
  }
};

var query = new fluentQueryString(query_config);

// Use the builder
var queryString = query
      .language("ru")
      .language()
      .partOfTheWorld(2)
      .count(10)
      .toString();

// result: query == "count=10&language=ru&language=en&partOfTheWorld=east"