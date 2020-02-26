'use strict';

const _setDefault = (val, newValue) => {
  return (val == 'undefined' || val == null) ? newValue : val;
}

function QueryString(properties) {
  this._queryString = {};

  var self = this;

  for (var p in properties) {
    (function (name, prop) {     
      self[name] = function(val) {
        var newValue = val;
        var propName = prop.name || name;

        newValue = _setDefault(val, prop.default);
      
        if (prop.func) {
          newValue = prop.func(newValue);
        }

        if (prop.op === 'add') {
          if (!self._queryString[propName]) {
            self._queryString[propName] = [newValue];
          }
          else {
            self._queryString[propName].push(newValue);
          }
        }
        else {
          self._queryString[propName] = newValue;
        }

        return self;  // Fluent
      };
    })(p, properties[p]);
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