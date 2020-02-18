'use strict';

function QueryString(operations) {
  this._queryString = {};

  var self = this;

  for (var m in operations) {
    (function (name, op) {     
      self[name] = function(val) {
        if (val === null) {
          self._queryString[name] = op.defualt;
        }
        else {
          if (op.func) {
            self._queryString[name] = op.func(val);
          }
          else {
            self._queryString[name] = val;
          }

          return self;  // Fluent
        };
      }
    })(m, operations[m]);
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
  return require('query-string').stringify(this.valueOf());
}

module.exports = QueryString;