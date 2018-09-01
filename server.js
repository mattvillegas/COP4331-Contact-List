// Testing if the auto deploy to github works..
// Testing the auto deploy on a different account than matt's...
// Testing pushing to database_development only...

var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const crypto = require("crypto");
var CONTACTS_COLLECTION = "contacts";
var USERS_COLLECTION = "users";
var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


// USERS API ROUTES
  app.post("/api/users/createuser", function(req, res) {
  var newUser = req.body;
  newUser.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
  newUser.createDate = new Date();
  newUser.fname = req.body.fname;
  newUser.lname = req.body.lname;
  newUser.email = req.body.email;

  if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
    handleError(res, "Invalid user input", "Missing Creation Parameter", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

// Note this should not be publicly available, for debugging purposes only
app.get("/api/users", function(req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});



// CONTACTS API ROUTES BELOW



/*  "/api/contacts/:id"
 *    GET: finds all contacts associated with the user's id :id
 *    POST: creates a new contact and associates it with the user id
 *    DELETE: deletes a contact associated with the user's id
 *    PUT: Updates a contact associated with the user's id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({"userid" : req.params.id}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts/:id", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();
  newContact.userid = req.params.id;
  newContact.phone = req.body.phone;
  newContact.address = req.body.address;
  newContact.email = req.body.email; 

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Missing Creation Parameter", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/* "/api/contacts/"
      GET: Print all contacts in database

      This is for debugging purposes only
*/

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});



app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $set: {name : updateDoc.name, email : updateDoc.email}}, {upsert : true}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});


app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
*/