'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');
var id = require('../middleware/course_id.js');

var getAll = require('./getall.js');
var get = require('./get.js');
var post = require('./post.js');
var put = require('./put.js');

// Don't allow anyone other than the current user to add/edit courses.
// Confusing duplicate instruction, as we already require authenication
// for those routes in
// The following routes should require authentication:
// POST /api/courses
// PUT /api/courses/:id
// Do you mean to say that only the user that created the course
// can edit (PUT) the course?


router.param('courseId', id);

router.get('/', getAll);
router.post('/', authorize, post);

// exceeds
router.put('/', function(req, res, next) {
  return res.status(403).json({ message: "Cannot edit a collection of courses"});
});

router.delete('/', function(req, res, next) {
  return res.status(403).json({ message: "Cannot delete a collection of courses"});
});

// Also include an Allow header with the value GET,PUT
var allowHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT');
    next();
};

router.all('/:courseId', allowHeaders);
router.get('/:courseId', get);
router.put('/:courseId', authorize, put);

// exceeds
router.post('/:courseId', function(req, res, next) {
  return res.status(405).json({ message: "Use the '/api/courses' route to create a course"});
});

router.post('/:courseId', function(req, res, next) {
  return res.status(403).json({ message: "Cannot delete a course"});
});

module.exports = router;
