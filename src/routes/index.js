'use strict';

var express = require('express');
var router = express.Router();

var users = require('./users');
var courses = require('./courses');
var reviews = require('./reviews');

router.use('/users', users);
router.use('/courses', courses);
courses.use('/:courseId/reviews', reviews);

// Update all routes that require authentication to
// check for the current user and return a 401 HTTP status code if not available.
// The following routes should require authentication:
// POST /api/courses
// PUT /api/courses/:id
// GET /api/users
// POST /api/users
// POST /api/courses/:courseId/reviews
// DELETE /api/courses/:courseId/reviews/:id


module.exports = router;
