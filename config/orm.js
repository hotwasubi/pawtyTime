// Import sql connection
var conn = require('../config/connection.js');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  };

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  };
  
var orm = {

    // Walker Tasks
    bookedStatus: function(table, condition, cb){
        var queryString = "SELECT * FROM " + table + "WHERE "; 
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);
        conn.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    addAppt: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        conn.query(queryString, vals, function(err, result){
            if(err) throw err;
            cb(result);
        });
    },

    //Function for setting appt availability
    updateAppt: function(table, objColVals, condition, cb){
        var queryString ="UPDATE "+ table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        conn.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    updateWalker: function(table, objColVals, condition, cb){
        var queryString ="UPDATE "+ table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        conn.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },


    deleteAppt: function(table, condition, cb){
        var queryString ="DELETE FROM "+ table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        conn.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },
    deleteWalker: function(table, condition, cb){
        var queryString ="DELETE FROM "+ table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        conn.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    // Owner Tasks
    getWalks: function(dogowner, cb){
        var queryString = `
            SELECT l.id AS id, l.dogname, c.walkDate, c.timeSlot  
            FROM 
                dog l
            LEFT JOIN
                dogowner r
            ON
               l.dogownerId = r.id
            LEFT JOIN
                appmnt c
            ON
              c.dogUser = l.id
            WHERE r.id = ${dogowner}
            `
        console.log(queryString);
        conn.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

};

//export ORM
module.exports = orm;
