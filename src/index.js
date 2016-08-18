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

var app = express();

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
  var err = new Error();
  err.status = 404;
  err.message = 'Not Found';
  return next(err);
});

app.use(function(err, req, res, next) {
  // Update the POST and PUT routes to return Mongoose validation errors.
  // The response should use the 400 status code.
  // In order for the AngularJS application to be able to display your
  // validation errors, convert the Mongoose validation errors into the
  // following JSON data structure:
  // {
  //   "message": "Validation Failed",
  //   "errors": {
  //     "property": [
  //       { "code": "", "message": "" },
  //       ...
  //     ]
  //   }
  // }
  // The mongoose validation errors already have all these properties in
  // this format. Does this mean we want to eliminate the stack trace from
  // the error that's sent?
  console.log(err);
  var status;
  switch(err.name) {
    case 'ValidationError':
      status = 400;
      break;
    case 'CastError':
      status = 500;
      break;
    default:
      status = 404;
      break;
  }
  res.status(status);
  res.json(err);
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
