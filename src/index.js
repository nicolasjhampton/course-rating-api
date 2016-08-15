'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var seeder = require('mongoose-seeder');
var bodyParser = require('body-parser');

var models = require('./models');
var mockData = require('./data/data.json');

var routes = require('./routes');
var errHandle = require('./routes/error-handler.js');

var app = express();
var User = models.User;
var Review = models.Review;
var Course = models.Course;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

app.use('/api', routes);

app.use(function(req, res, next) {
  return errHandle(next, 'Not Found', 404);
});

app.use(function(err, req, res, next) {
  res.status = err.status || 500;
  console.log(err);
  return res.json(err);
});

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(err) {
  console.error(`connnection error: ${err}`);
});

db.once('open', function() {
  seeder.seed(mockData)
        .then(function(data) {
          console.log('connection was successful');
        });

  // start listening on our port
  var server = app.listen(app.get('port'), function() {
    console.log('Express server is listening on port ' + server.address().port);
  });
});
