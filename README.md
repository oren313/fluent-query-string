# fluent-query-string

  Create a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface) fluent query string.

## Installation
```bash
    $ npm install fluent-query-string
```

## Description
``` 
  The module helps to create a schema model of your query. It enables to call the property on the object as a callback and by that makes your code much readable and fulent.
```

## Usage
  ### op  
  ```
    The op property define whether your property type is one value or multiple.
    "op": "set" ---> one value (object)
    "op": "add" ---> multiple value (array)
  ```
  ```js
    Example:
          var queryBuilder = {
            "firstname": {
              "op": "add"
            },
            "lastname": {
              "op": "set"
            }
          };
    
          var query = new QueryString(queryBuilder);
          var result = query.firstname("Joe").firstname("Mark").lastname("Johnson");
  ```
  #### Output
  ```json
    {
      "result" : {
        "firstname": ["Joe","Mark"],
        "lastname": "Johnson"
      }
    }
  ```
---

  ### name
  ```
    The name property allows to define the property the way you want it for the schema. But that the builder function will have a different name.
  ```
  ```js
    Example:
          var queryBuilder = {
            "withCount": {
              "name": "count",
              "op": "set"
            }
          };
    
          var query = new QueryString(queryBuilder);
          var result = query.withCount(100);
  ```
  #### Output
  ```json
    {
      "result" : {
        "count": 100
      }
    }
  ```
---

  ### default
  ```
  Enable to set a defualt value when calling the callback on the query builder.
  ```
  ```js
    Example:
          var queryBuilder = {
            "maxSize": {
              "op": "set",
              "default": "10"
            }
          };
    
          var query = new QueryString(queryBuilder);
          var result = query.maxSize();
  ```
  #### Output
  ```json
    {
      "result" : {
        "maxSize": 10
      }
    }
  ```
---

  ### func
Allows to set the property with any callback.

  ```js
    Example:
          var queryBuilder = {
            "maxSize": {
              "op": "set",
              "default": "10",
              "func": (value)=> {
                if (value > 1000) { 
                  return 1000;
                } else if (value < 1) {
                   return 1; 
                }
                return value;
              }
            }
          };
    
          var query = new QueryString(queryBuilder);
          var result1 = query.maxSize(99999);
          var result2 = query.maxSize(-100);
  ```
  #### Output
  ```json
    {
      "result1" : {
        "maxSize": 1000
      }
    }
  ```
  ```json
    {
      "result2" : {
        "maxSize": 1
      }
    }
  ```
  ## Demo
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
    },
    "withCountry": {
      "name": "country",
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
        .withCountry("England")
        .toString();

  // result: query == "count=10&country=England&language=ru&language=en&partOfTheWorld=east"
```
  ## Contributing
  Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  Please make sure to update tests as appropriate.

  ## License
[MIT](https://choosealicense.com/licenses/mit/)