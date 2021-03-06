var express = require("express");

var path = require("path");

var bodyParser = require("body-parser");

var mongodb = require("mongodb");

var ObjectID = mongodb.ObjectID;


var CONTACTS_COLLECTION = "contacts";


var app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server. 
mongodb.MongoClient.connect("mongodb://mahesh:mahesh@ds021701.mlab.com:21701/traildata", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */
