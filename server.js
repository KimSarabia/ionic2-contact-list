"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
  mongoClient = mongodb.MongoClient,
  ObjectID = mongodb.ObjectID,
  db;

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use(express.static("www"));

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_03zcbl71:lcncgf0b8cvrebf99bsi4n554g@ds033106.mlab.com:33106/heroku_03zcbl71';

mongoClient.connect(MONGODB_URI, function(err, database) {
  if (err) {
    process.exit(1);
  }

  db = database;

  console.log("Database connection ready");

  app.listen(app.get('port'), function() {
    console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });
});


app.get("/api/friends", function(req, res) {
  db.collection("friends").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get friends");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/friends", function(req, res) {
  var newFriend = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio,
    imgUrl: req.body.imgUrl
  }

  db.collection("friends").insertOne(newFriend, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to add friend");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


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

function handleError(res, reason, message, code) {
  console.log("API Error: " + reason);
  res.status(code || 500).json({"Error": message});
}
