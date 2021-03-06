var expect = require('chai').expect;
var {QueryString} = require('../index');

describe("Sanity tests", function() {

  describe("full sanity like Readme.md", function() {
    it("should work with all features properly like the readme example", function(done){
      // Arrange
      var queryBuilder = {
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

      var query = new QueryString(queryBuilder);
    
      // Act
      var queryBuilder = query
        .language("ru")
        .language()
        .partOfTheWorld(2)
        .count(10);

      // Assert
      expect(query.valueOf()).to.deep.equal({language:["ru","en"], partOfTheWorld:"east",count:10});
      expect(query.toString()).to.equal("count=10&language=ru&language=en&partOfTheWorld=east");
      done();
    });
  });

  describe("operations", function() {

    describe("set", function() {
      
      it("should set q once", function(done) {
        // Arrange
        var queryBuilder = new QueryString({
          "q": {
            "op": "set"
          }
        });

        // Act
        var query = queryBuilder.q('google');

        // Assert
        expect(query.valueOf()).to.deep.equal({q:'google'});
        expect(query.toString()).to.equal('q=google');
        done();
      });

      it("should set q twice", function(done) {
        // Arrange
        var queryBuilder = new QueryString({
          "q": {
            "op": "set"
          }
        });

        // Act
        var query = queryBuilder.q('google');
        query = queryBuilder.q('bing');

        // Assert
        expect(query.valueOf()).to.deep.equal({q:'bing'});
        expect(query.toString()).to.equal('q=bing');
        done();
      });
    });

    describe("add", function() {
      it("should add two values", function(done) {
        // Arrange
        const FIRST = "first";
        const SECOND = "second";

        var queryBuilder = new QueryString({
          "q": {
            "op": "add"
          }
        });
        queryBuilder.q(FIRST).q(SECOND);
        expect(queryBuilder.valueOf()).to.deep.equal({q:[FIRST, SECOND]});
        expect(queryBuilder.toString()).to.equal(`q=${FIRST}&q=${SECOND}`);
        done();
      });
  
      it("should add multi values ", function(done) {
        // Arrange
        const FIRST = "first";
        const SECOND = "second";
        const THIRD = "third";

        var queryBuilder = new QueryString({
          "q": {
            "op": "add"
          }
        });

        // Act
        queryBuilder.q(FIRST).q(SECOND).q(THIRD);

        // Assert
        expect(queryBuilder.valueOf()).to.deep.equal({q:[FIRST, SECOND, THIRD]});
        expect(queryBuilder.toString()).to.equal(`q=${FIRST}&q=${SECOND}&q=${THIRD}`);
        done();
      });
    });
  });

  describe("default", function() {
    it("should set q with default value", function(done) {
      // Arrange
      const DEFAULT = "test";
      
      var queryBuilder = new QueryString({
        "q": {
          "op": "set",
          "default": DEFAULT
        }
      });

      // Act
      var query = queryBuilder.q();

      // Assert
      expect(query.valueOf()).to.deep.equal({q: DEFAULT});
      expect(query.toString()).to.equal(`q=${DEFAULT}`);
      done();
    });

    it("should add q with default value when no values at all", function(done) {
      // Arrange
      const DEFAULT = "test";
      
      var queryBuilder = new QueryString({
        "q": {
          "op": "add",
          "default": DEFAULT
        }
      });

      // Act
      var query = queryBuilder.q();

      // Assert
      expect(query.valueOf()).to.deep.equal({q: [DEFAULT]});
      expect(query.toString()).to.equal(`q=${DEFAULT}`);
      done();
    });

    it("should add q with default value when there are values", function(done) {
      // Arrange
      const DEFAULT = "test";
      const FIRST_VALUE = "first";

      var queryBuilder = new QueryString({
        "q": {
          "op": "add",
          "default": DEFAULT
        }
      });

      // Act
      var query = queryBuilder.q(FIRST_VALUE).q();

      // Assert
      expect(query.valueOf()).to.deep.equal({q: [FIRST_VALUE,DEFAULT]});
      expect(query.toString()).to.equal(`q=${FIRST_VALUE}&q=${DEFAULT}`);
      done();
    });
  });

  describe("func", function() {
    it("shuold add value from a closed list", function (done) {
      // Arrange 
      var AREAS = ["north","south"];
      var queryBuilder = new QueryString({
        "q": {
          "op": "set",
          "func": (val) => {let arr = AREAS;  return arr[val]; }
        }
      });
     
      // Act
      var query = queryBuilder.q(0);

      //Assert
      expect(query.valueOf()).to.deep.equal({q: AREAS[0]});
      expect(query.toString()).to.equal(`q=${AREAS[0]}`);
      done();
    });
  });

  describe("name", function() {
    it("should set the property of the model by its name", function(done) {
        // Arrange
        var queryBuilder = {
          "withCount": {
            "name": "count",
            "op": "set"
          }
        };
  
        var query = new QueryString(queryBuilder);
      
        // Act
        var queryBuilder = query
          .withCount(100);
  
        // Assert
        expect(query.valueOf()).to.deep.equal({count:100});
        expect(query.toString()).to.equal("count=100");
        done();
    });
  });
});