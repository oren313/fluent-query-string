'use strict';

function QueryString(methods) {
  this._queryString = {};

  var self = this;

  for (var m in methods) {
    (function (name, method) {     
      self[name] = function(val) {
        if (method.func) {
          self._queryString[name] = method.func(val);
        }
        else {
          self._queryString[name] = val;
        }

        return self;  // Fluent
      };
    })(m, methods[m]);  // iife
  } 
}

QueryString.prototype.valueOf = function() {
  var queryString = {};
  
  for (var query in this._queryString) {
    queryString[query] = this._queryString[query];
  }

  return queryString;
};

QueryString.prototype.toString = function() {
  return require('querystring').stringify(this.valueOf());
}

module.exports = QueryString;