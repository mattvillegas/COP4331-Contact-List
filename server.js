const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('./dbcreds');
//var ObjectID = mongodb.ObjectID;
const crypto = require("crypto");
var CONTACTS_COLLECTION = "contacts";
var USERS_COLLECTION = "users";
const path = require("path");
var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database before starting the application server.
mongoose.connect(config.dburl);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
	// should be connected
	console.log('connected to remote database');
});

  
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
    console.log("App now running on port", port);
  });


var contactSchema = new mongoose.Schema({
	createDate: Date,
	name: String,
	phone: String,
	email: String,
	address: String,
	CreatedByUserID: String,
	//_id: String
});

var userSchema = new mongoose.Schema({
	createDate: Date,
	fname: String,
	lname: String,
	email: String,
	password: String
	//_id: String
});

var Contact = mongoose.model("Contact", contactSchema);
var User = mongoose.model("User", userSchema);

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.post("/api/users/login", function(req, res) {
  req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
  User.findOne(req.body, function(err, user) {
    if(err){
      handleError(res, "Database error");
    }
    else {
      if(!user)
      {
        res.status(201).json("Log-in Failed");
      }
      else{
      res.status(201).json(user);
      }
    }
  })
});

// USERS API ROUTES
  app.post("/api/users/createuser", function(req, res) {
  
  var user = new User({
	  createDate: new Date(),
	  fname: req.body.fname,
	  lname: req.body.lname,
	  email: req.body.email,
	  password: crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex')
	  });

  if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
    handleError(res, "Invalid user input", "Missing Creation Parameter", 400);
  } else {
      user.save(function(err, user) {
       if(err) {
        handleError(res, "Databse error", "Error saving user data");
      }
		   else {
		    console.log("User successfully created!");
		    res.status(201).json(user);
		  }
    });
  }
});

// Note this should not be publicly available, for debugging purposes only
app.get("/api/users", function(req, res) {
  
    
  User.find(function(err, users) {
	  if (err) {
	    handleError(res, err.message, "Couldnt get users");
	  }
	  else {
	    res.status(201).json(users);
    }
  })
});


// CONTACTS API ROUTES BELOW

/*  "/api/contacts/:id"
 *    GET: finds all contacts associated with the user's id :id
 *    POST: creates a new contact and associates it with the user id
 *    DELETE: deletes a contact associated with the user's id
 *    
 */

app.get("/api/contacts/:id", function(req, res) {
  
  Contact.find({CreatedByUserID: req.params.id}, function(err, contactsFromUser) {
	  if (err) {
	    handleError(res, err.message, "Couldnt get contacts for this user");
	  }
	  else {
	    res.status(201).json(contactsFromUser);
	  }
    }) 
});

app.post("/api/contacts/create/:id", function(req, res) {
  
  var contact = new Contact({
	  createDate: new Date(),
	  name: req.body.name,
	  phone: req.body.phone,
	  email: req.body.email,
	  address: req.body.address,
	  CreatedByUserID: req.params.id
	  });

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Missing Creation Parameter", 400);
  } else {
    contact.save(function(err, contact) {
		if(err) return console.log("Didnt save");
		else {
		  console.log("Contact succesfully created")
		  res.status(201).json(contact);
		}
    });
  }
});


app.post("/api/contacts/search/:id", function(req, res){

  // TODO: SANITIZE
  var searchFor = req.body.searchFor;
 
  Contact.find({
    $and: [
      {$or: [ {"name": searchFor}, {"email" : searchFor}, {"phone": searchFor}, {"address" : searchFor} ]},
      {CreatedByUserID : req.params.id}  
    ]   
  }, function(err, foundContacts){ 
    if(err) {
      handleError(res, "Database error retrieving contact", "Contact not found!");

    }
    else {
        if(!foundContacts.length) {
          res.status(201).json("No contacts found");
        }
        else {
          res.status(201).json(foundContacts)
        }
    }
  })
});

/* "/api/contacts/"
      GET: Print all contacts in database

      This is for debugging purposes only
*/

app.get("/api/contacts",function(req, res) {
  Contact.find(function(err, allContacts) {
    if(err) {
      handleError(res, "Error fetching contacts", "Could not fetch contacts from Database");
    }  
    else {
      console.log("Succesfully fetched all users!");
      res.status(201).json(allContacts);
    }

  })
});