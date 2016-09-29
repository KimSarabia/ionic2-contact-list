"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

var mongodb = require('mongodb'),
  mongoClient = mongodb.MongoClient,
  ObjectID = mongodb.ObjectID,
  db;

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use(cookieParser());
app.use(express.static("www"));
app.use(session({ resave: true,saveUninitialized: true, secret: 'test', store: new MongoStore({ url: 'mongodb://heroku_03zcbl71:lcncgf0b8cvrebf99bsi4n554g@ds033106.mlab.com:33106/heroku_03zcbl71' }) }));
app.use(passport.initialize());
app.use(passport.session());

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

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  db.collection("users").findOne({_id: new ObjectID(_id)}, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.collection("users").findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (password !== user.password) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.get("/api/friends", function(req, res) {
  db.collection("friends").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get friends");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.post("/api/users", function(req, res) {
  db.collection("users").insert({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    school: req.body.school
  }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to save");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.post('/api/sessions', function(req, res){
  passport.authenticate('local', function (err, user, info) {
           if ((err) || (!user)) {
               return res.status(401).json(err);
           }

           req.login(user, function (err) {
               if (err) {
                   return res.status(401).json(err);
               }
               return res.send(user);
           });
       })(req, res);
});

app.get('/api/sessions', function(req, res){
  //console.log(req.isAuthenticated());
  return res.send(req.user);
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
