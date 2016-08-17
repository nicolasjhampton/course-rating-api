'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');
var id = require('../middleware/course_id.js');

var getAll = require('./getall.js');
var get = require('./get.js');
var post = require('./post.js');
var put = require('./put.js');

router.param('courseId', id);
router.get('/', getAll);
// POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
router.post('/', authorize, post, getAll);

router.get('/:courseId', get);
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:courseId', authorize, put, getAll);


module.exports = router;
