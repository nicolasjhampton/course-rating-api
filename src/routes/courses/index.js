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
router.get('/:courseId', get);
router.put('/:courseId', authorize, put);


module.exports = router;
