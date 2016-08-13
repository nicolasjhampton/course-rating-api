'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var seeder = require('mongoose-seeder');

var models = require('./models');
var mockData = require('./data/data.json');

var routes = require('./routes');

var app = express();
var User = models.User;
var Review = models.Review;
var Course = models.Course;

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

app.use('/api', routes);

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
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
