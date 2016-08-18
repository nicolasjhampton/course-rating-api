'use strict';

var express = require('express');
var router = express.Router();

var users = require('./users');
var courses = require('./courses');
var reviews = require('./reviews');

router.use('/users', users);
router.use('/courses', courses);
courses.use('/:courseId/reviews', reviews);

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


module.exports = router;
