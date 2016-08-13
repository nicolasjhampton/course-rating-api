'use strict';

var router = require('express').router;

var users = require('./users');
var courses = require('./courses');
var reviews = require('./reviews');

router.use('/users', users);
router.use('/courses', courses);
router.use('/courses/:courseId/reviews', reviews);


module.exports = router;
