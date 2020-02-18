var assert = require('assert');
var expect = require('chai').expect;
var {QueryString} = require('../index');

describe("Sanity tests", function() {

  describe("operations", function() {

    describe("set", function() {
      
      it("should set q once", function(done) {
        var queryBuilder = new QueryString({
          "q": {
            "method": "set"
          }
        });
        var query = queryBuilder.q('google');
        expect(query.valueOf()).to.deep.equal({q:'google'});
        expect(query.toString()).to.equal('q=google');
        done();
      });

      it("it should set q twice", function(done) {
        var queryBuilder = new QueryString({
          "q": {
            "method": "set"
          }
        });
        var query = queryBuilder.q('google');
        query = queryBuilder.q('bing');
        expect(query.valueOf()).to.deep.equal({q:'bing'});
        expect(query.toString()).to.equal('q=bing');
        done();
      });
    });

    describe("add", function() {

      // it("double", function(done) {
      //   var qsb = new builder({
      //     "q": {
      //       "method": "add"
      //     }
      //   });
      //   qsb.q('google').q('bing');
      //   expect(qsb.valueOf()).to.deep.equal({q:['google', 'bing']});
      //   expect(qsb.toString()).to.equal('q=google&q=bing');
      //   done();
      // });
  
      // it("multi", function(done) {
      //   var qsb = new builder({
      //     "q": {
      //       "method": "add"
      //     }
      //   });
      //   qsb.q('google').q('bing').q('yahoo');
      //   expect(qsb.valueOf()).to.deep.equal({q:['google', 'bing', 'yahoo']});
      //   expect(qsb.toString()).to.equal('q=google&q=bing&q=yahoo');
      //   done();
      // });
    });
  });

  describe("default", function() {
  });

  describe("func", function() {
  });
});