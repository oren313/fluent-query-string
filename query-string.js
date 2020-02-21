'use strict';

function QueryString(operations) {
  this._queryString = {};

  var self = this;

  for (var o in operations) {
    (function (name, op) {     
      self[name] = function(val) {
        var newValue = val;

        if (val == 'undefined' || val == null) {
          newValue = op.default;
        }

        if (op.func) {
          newValue = op.func(newValue);
        }

        if (op.op === 'add') {
          if (!self._queryString[name]) {
            self._queryString[name] = [newValue];
          }
          else {
            self._queryString[name].push(newValue);
          }
        }
        else {
          self._queryString[name] = newValue;
        }

        return self;  // Fluent
      };
    })(o, operations[o]);
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