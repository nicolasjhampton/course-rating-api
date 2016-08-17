'use strict';

var express = require('express');
var router = express.Router();

var id = require('./middleware/course_id.js');

var users = require('./users');
var courses = require('./courses');
var reviews = require('./reviews');

router.param('courseId', id);
router.use('/users', users);
router.use('/courses', courses);
router.use('/courses/:courseId/reviews', reviews);


module.exports = router;
