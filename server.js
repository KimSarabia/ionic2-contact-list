"use strict";

//server.js (friend-ionic2-heroku/server.js)
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
  mongoClient = mongodb.MongoClient,
  ObjectID = mongodb.ObjectID, // Used in API endpoints
  db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_03zcbl71:lcncgf0b8cvrebf99bsi4n554g@ds033106.mlab.com:33106/heroku_03zcbl71';

// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function(err, database) {
  if (err) {
    process.exit(1);
  }

  db = database; // Our database object from mLab

  console.log("Database connection ready");

  // Initialize the app.
  app.listen(app.get('port'), function() {
    console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });
});

// Friend API Routes Will Go Below

//server.js
/*
* Endpoint --> "/api/friends"
*/

// GET: retrieve all friends
app.get("/api/friends", function(req, res) {
  db.collection("friends").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get friends");
    } else {
      res.status(200).json(docs);
    }
  });
});

// POST: create a new friend
app.post("/api/friends", function(req, res) {
  var newFriend = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio
  }

  db.collection("friends").insertOne(newFriend, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to add friend");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*
* Endpoint "/api/friends/:id"
*/

// GET: retrieve a friend by id -- Note, not used on front-end
app.get("/api/friends/:id", function(req, res) {
  db.collection("friends").findOne({
    _id: new ObjectID(req.params.id)
  }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get friend by _id");
    } else {
      res.status(200).json(doc);
    }
  });
});

// PUT: update a friend by id
app.put("/api/friends/:id", function(req, res) {
  var updateFriend = req.body;
  delete updateFriend._id;

  db.collection("friends").updateOne({
    _id: new ObjectID(req.params.id)
  }, updateFriend, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update friend");
    } else {
      res.status(204).end();
    }
  });
});

// DELETE: delete a friend by id
app.delete("/api/friends/:id", function(req, res) {
  db.collection("friends").deleteOne({
    _id: new ObjectID(req.params.id)
  }, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete friend");
    } else {
      res.status(204).end();
    }
  });
});

// Error handler for the api
function handleError(res, reason, message, code) {
  console.log("API Error: " + reason);
  res.status(code || 500).json({"Error": message});
}
